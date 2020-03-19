import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

import CreateAppointService from '../services/CreateAppointmentService';
import CancelAppointService from '../services/CancelAppointmentService';

import Cache from '../../lib/Cache';
class AppointmentController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const cacheKey = `user:${req.userId}:appointments:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      offset: (page - 1) * limit,
      limit,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    await Cache.set(cacheKey, appointments);

    return res.json(appointments);
  }

  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment =await CreateAppointService.run({
      provider_id,
      user_id: req.userId,
      date,
    })

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await CancelAppointService.run({provider_id: req.params.id, user_id: req.userId});

    return res.json(appointment);
  }
}

export default new AppointmentController();

import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import Mail, { getTextEmail } from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    const formattedDate = format(
      parseISO(appointment.date),
      "dd 'de' MMMM', às 'HH:mm'h'",
      {
        locale: pt,
      }
    );

    await Mail.senddMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancelation',
      text: getTextEmail('cancelation', {
        ...appointment,
        date: formattedDate,
      }),
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: formattedDate,
      },
    });
  }
}

export default new CancellationMail();

import Youch from 'youch';

export default async (error, req, res, next) => {
  const errors = await new Youch(error, req).toJSON();

  return res.status(500).json(errors);
};

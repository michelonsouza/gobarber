import { Router } from 'express';

const routes = new Router();

routes.use('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

export default routes;

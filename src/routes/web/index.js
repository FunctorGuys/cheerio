import { Router } from 'express';
import * as dateFns from 'date-fns';
import homeRoutes from './home';

const attachLocals = (req, res, next) => {
  res.locals.currentUser = req.currentUser;
  res.locals.dateFns = dateFns;
  next();
};

const routes = () => {
  const app = Router();

  app.use(attachLocals);

  homeRoutes(app);

  return app;
};

export default routes;

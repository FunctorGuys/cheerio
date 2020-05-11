import { Router } from 'express';
import HomeController, { HomeValidate } from '@/modules/web/home';
import { schemaValidator, camelCase } from '@/middleware';
import upload, { fileFilter } from '@/loaders/upload';

const fileFilterHtml = fileFilter({
  mimeType: (type) => type === 'text/html',
  message: 'Vui lòng upload html files',
});

export const uploadHtml = () => {
  const uploadFile = upload({
    fileFilter: fileFilterHtml,
  }).array('html');

  return (req, res, next) => {
    uploadFile(req, res, (err) => {
      if (err) {
        req.multerError = [{ message: err.message }];
      }

      next();
    });
  };
};

const routes = (app) => {
  const route = Router();

  app.use('', route);

  route.get('/', HomeController.homePage);
  route.post(
    '/process',
    (req, res, next) => {
      req.uploadDestination = 'storage/tmp';
      next();
    },
    uploadHtml(),
    camelCase(),
    schemaValidator(HomeValidate.process),
    HomeController.process,
  );
};

export default routes;

import fs from 'fs';
import { wrapError } from '@/utils/common';
import * as HomeService from './home.service';

const renderHomePage = (req, res, data = {}) => {
  const {
    errors = req.flash('processError') || [],
    oldInput = req.flash('processOldInput')[0] || {},
  } = data;

  res.render('web/pages/home', {
    errors,
    oldInput,
  });
};

export const homePage = wrapError((req, res) => {
  renderHomePage(req, res);
});

export const process = wrapError((req, res) => {
  const data = {
    headContent: req.body.headContent,
    files: req.files,
  };
  const multerRequired =
    data.files && data.files.length
      ? null
      : [{ message: 'files can not empty' }];
  const errors = req.joiError || req.multerError || multerRequired;
  const renderInvalid = (err) => {
    req.flash('processError', err);
    req.flash('processOldInput', data);
    return res.redirect('/');
  };

  if (errors) {
    return renderInvalid(errors);
  }

  return HomeService.process(data)
    .then((zipPath) => {
      return new Promise((resolve, reject) => {
        res.download(zipPath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(zipPath);
          }
        });
      });
    })
    .then((zipPath) => {
      data.files.forEach((file) => {
        fs.promises.unlink(file.path);
      });
      fs.promises.unlink(zipPath);
    });
});

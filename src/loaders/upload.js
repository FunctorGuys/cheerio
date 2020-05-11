import multer from 'multer';
import fs from 'fs';
import path from 'path';
import mimeTypes from 'mime-types';
import { PATH_ROOT } from '@/config';

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination =
      req.uploadDestination || path.resolve(PATH_ROOT, 'storage/uploads');
    if (!fs.existsSync(destination))
      fs.mkdirSync(destination, { recursive: true });
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = (config = {}) =>
  multer({
    ...config,
    storage: storage,
  });

export const fileFilter = ({ mimeType, message }) => (req, file, cb) => {
  const type = mimeTypes.lookup(file.originalname);

  if (mimeType(type)) {
    cb(null, true);
  } else {
    return cb(new Error(message));
  }
};

export const fileFilterImage = fileFilter({
  mimeType: (type) => type.startsWith('image/'),
  message: 'Chỉ ảnh .png, .jpg and .jpeg được cho phép!',
});

export const uploadSingleImage = (field, config = {}) => {
  const uploadFile = upload({
    ...config,
    fileFilter: fileFilterImage,
  }).single(field);

  return (req, res, next) => {
    uploadFile(req, res, (err) => {
      if (err) {
        req.multerError = [{ message: err.message }];
      }

      next();
    });
  };
};

export default upload;

import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { PATH_ROOT } from '@/config';

export const process = ({ headContent, files }) => {
  const basePath = path.join(PATH_ROOT, 'storage', 'tmp');
  const zipName = `${Date.now()}.zip`;
  const zipPath = path.join(basePath, zipName);

  return Promise.all(
    files.map((file) => {
      return fs.promises.readFile(file.path, 'utf8').then((content) => {
        const $ = cheerio.load(content);
        $('head').prepend(headContent);
        return fs.promises.writeFile(file.path, $.html(), 'utf8');
      });
    }),
  )
    .then(() => {
      return new Promise((res, rej) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
          zlib: { level: 9 },
        });

        output.on('close', function () {
          console.log(archive.pointer() + ' total bytes');
          console.log(
            'archiver has been finalized and the output file descriptor has closed.',
          );
          res(output);
        });

        output.on('end', function () {
          console.log('Data has been drained');
        });

        archive.on('error', (err) => {
          rej(err);
        });

        archive.pipe(output);

        files.forEach((file) => {
          archive.file(file.path, { name: file.originalname });
        });

        archive.finalize();
      });
    })
    .then(() => {
      return zipPath;
    });
};

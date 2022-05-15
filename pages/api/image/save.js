import path from 'path';
import formidable from 'formidable';
import ErrorResponse from "../../../lib/ErrorResponse";
import { dbConnect } from "../../../lib/db";
import imageFile from '../../../src/model/ImageFile';
import { Buffer } from 'buffer';
import { customAlphabet } from 'nanoid';
import sharp from 'sharp';
import NOD from '../../../lib/NOD';


const createSecureImage = () => {
  const time = Date.now();
  const timeBuf = Buffer.allocUnsafe(6);
  timeBuf.writeUInt16BE(time & 0xffff, 4);
  timeBuf.writeUInt16BE(time / 0x10000 & 0xffff, 2);
  timeBuf.writeUInt16BE(time / 0x100000000 & 0xffff, 0);

  const randKey = createSecureImage._rand(12);

  const index = createSecureImage._index & 0xffff;
  createSecureImage._index = createSecureImage._index >= 0xffff ? 0 : createSecureImage._index + 1;
  const indexBuf = Buffer.allocUnsafe(2);
  indexBuf.writeUInt16BE(index);

  return `${timeBuf.toString('hex')}.${indexBuf.toString('hex')}.${randKey}`.toUpperCase();
};
createSecureImage._index = Math.random() * 0x10000 | 0;
createSecureImage._rand = customAlphabet('0123456789ABCDEF');
const createSecureFilename = () => {
  const time = Date.now();
  const timeBuf = Buffer.allocUnsafe(6);
  timeBuf.writeUInt16BE(time & 0xffff, 4);
  timeBuf.writeUInt16BE(time / 0x10000 & 0xffff, 2);
  timeBuf.writeUInt16BE(time / 0x100000000 & 0xffff, 0);

  const rand = createSecureFilename._rand(16);

  const index = createSecureFilename._index & 0xff;
  createSecureFilename._index = createSecureFilename._index >= 0xff ? 0 : createSecureFilename._index + 1;
  const indexBuf = Buffer.allocUnsafe(1);
  indexBuf.writeUInt8(index);

  return `${timeBuf.toString('hex')}-${indexBuf.toString('hex')}-${rand}`.toUpperCase();
};
createSecureFilename._index = Math.random() * 0x100 | 0;
createSecureFilename._rand = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


const FORMIDABLE_OPTIONS = {
  multiples: false,
  uploadDir: path.resolve('.', 'upload'),
  minFileSize: 128,
  maxFileSize: 8 * 1024 * 1024,
  filter: function ({ name, originalFilename, mimetype }) {
    const format = String(originalFilename).split('.').pop();
    return name == 'IMAGE';
  },
  filename: function (name, ext, part, form) {
    const secure = createSecureFilename();
    const type = String(part.originalFilename).split('.').pop();
    return type ? `${secure}.${type}` : secure;
  }
};

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === 'POST') {

      const form = new formidable.IncomingForm(FORMIDABLE_OPTIONS);
      const data = await (new Promise(resolve => { form.parse(req, (err, fields, files) => resolve({ err, fields, files })); }));
      if (data.err) throw new ErrorResponse(400, 'ERROR upload image');

      const file = data.files['IMAGE'];
      if (!file) throw new ErrorResponse(400, 'ERROR upload image');

      const imageMeta = await sharp(file.filepath).metadata();

      const ext = String(file.originalFilename).split('.').pop();
      const key = createSecureImage();
      const common = NOD(imageMeta.width, imageMeta.height) || 1;

      const image = new imageFile.ImageFile({
        key: key,
        name: file.newFilename,
        ext: ext,
        mimetype: file.mimetype,
        filename: file.originalFilename,
        originalFilename: file.originalFilename,
        size: file.size,
        width: imageMeta.width,
        height: imageMeta.height,
        isAlpha: imageMeta.hasAlpha,
        ratio: {
          common: common,
          width: imageMeta.width / common,
          height: imageMeta.height / common
        }
      });
      image.save();

      const imageDTO = image.toDTO();

      return res.status(200).json({ image: imageDTO });
    };


    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
import ErrorResponse from "../../../lib/ErrorResponse";
import KEY from "../../../src/constants/keys_property";
import { IMG_TYPE } from "../../../src/constants/public";
import imageFile from "../../../src/model/ImageFile";
import fs from 'fs';
import { dbConnect } from "../../../lib/db";
import { limit } from "../../../lib/limit";
import sharp from "sharp";


// TODO
const HEADERS = {
  ID: 'image-id',
  FILE_TYPE: 'file-type',
  INITIAL_SIZE: 'initial-sizes',
  FIT: 'resize-fit'
};


export default async function handler(req, res) {
  try {
    await dbConnect();

    const key = String(req.query.key);

    if (req.method === 'GET') {
      const fit = Object.hasOwnProperty.call(sharp.fit, req.query.fit) ? req.query.fit : sharp.fit.fill;
      const sizes = String(req.query.sizes);
      const metadata = typeof (req.query.metadata) !== 'undefined';
      const attachment = typeof (req.query.attachment) !== 'undefined';

      const image = await imageFile.ImageFile.findOne({ key }).exec();
      if (!image) throw new ErrorResponse(404, 'ERROR image not found');

      const imagePath = `${imageFile.meta.dir}/${image.name}`;
      const imageType = IMG_TYPE.find(type => image.mimetype === type.mime) || null;

      res.setHeader(HEADERS.ID, image._id);
      imageType && res.setHeader(HEADERS.FILE_TYPE, imageType.name);

      if (metadata) return res.status(200).json(image.toDTO({ time: true, version: true, timeChange: true, imageType: true }));
      if (sizes) {
        var [w, h] = sizes.split('x').map(size => Number(size || 0) | 0 || 0); // "1920x1080" => [1920, 1080]
        if (w && h && w > 0 && h > 0) {
          const img = sharp(imagePath, { animated: true });
          const metadata = await img.metadata();
          if (w <= metadata.width && h <= metadata.height) {
            const imageBuffer = await img.resize(w, h, { fit }).toFormat(metadata.format).toBuffer();
            res.setHeader(HEADERS.FIT, fit);
            res.setHeader(HEADERS.INITIAL_SIZE, `${metadata.width}x${metadata.height}`);
            res.setHeader('content-disposition', `${attachment ? 'attachment' : 'inline'}; name="IMAGE"; filename="${image.filename || image.originalFilename || ''}"`); // inline | attachment
            res.setHeader('content-type', image.mimetype);
            res.status(200);
            res.send(imageBuffer);
            return;
          };
        };
      };

      const imageBuffer = fs.ReadStream(imagePath);

      if (!imageBuffer) throw new ErrorResponse(404, 'ERROR file image not found');

      res.setHeader(HEADERS.INITIAL_SIZE, `${image.width}x${image.height}`);
      res.setHeader('content-disposition', `${attachment ? 'attachment' : 'inline'}; name="IMAGE"; filename="${image.filename || image.originalFilename || ''}"`); // inline | attachment
      res.setHeader('content-type', image.mimetype);
      res.status(200);
      res.send(imageBuffer);
      return;
    };

    if (req.method === 'PUT') {
      const body = req.body;

    };

    if (req.method === 'POST') {
      const body = req.body;
    };

    if (req.method === 'DELETE') {
      const body = req.body;
    };


    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
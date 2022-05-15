import ErrorResponse from "../../../lib/ErrorResponse";
import fs from 'fs';
import path from 'path';

const DIRECTORY = path.resolve('.', 'static');


export default async function handler(req, res) {
  const keyQuery = String(req.query.key);

  try {
    if(req.method === 'GET') {
      const file = fs.readFileSync(`${DIRECTORY}/ice.mp3`);

      res.setHeader('Content-Type', 'audio/mpeg');
      return res.status(200).send(file);
    };


    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
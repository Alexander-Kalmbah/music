
import ErrorResponse from '../../lib/ErrorResponse';


export default async function handler(req, res) {
  try {
    if(req.method == 'GET') {
      return res.status(200).json({ip: req.headers["x-real-ip"] || req.connection.remoteAddress || ''});
    };
    

    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
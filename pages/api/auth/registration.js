import API from '../../../lib/API';
import bcrypt from 'bcrypt';


/**
 * @param {import('next').NextApiRequest} req - request
 * @param {import('next').NextApiResponse} res - response
 */
export default async function handler(req, res) {
  try {
    await API.connectDB();

    if (req.method === 'POST') {
      const hash = await bcrypt.hash(req.body.password, 12);
      const compare = await bcrypt.compare(req.body.password, hash);

      return res.status(200).json({ body: req.body, hash, compare });
    };

    throw new API.ErrorResponse(405);
  } catch (error) {
    if (error instanceof API.ErrorResponse) { return error.sand(res); };
    return new API.ErrorResponse(500).sand(res);
  }
};
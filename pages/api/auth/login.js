import API from '../../../lib/API';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';


const SECRET_ACCESS = 'S1>f&U[Za9S1\\_{3L@\'9.[;';
const SECRET_REFRESH = 'x/4Hh:r8JNB\\6}=iqY-`6EN-=heoc(-)Dh:rRxQzQ';

const ALGORITHM = 'HS512';

const ADMIN_ID = '0';
const ADMIN_FULLNAME = 'Admin';
const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = '$2b$12$W9d1fLptGZ9/joU.9b82/ewI14OrFmw0StnhYshNwHmbph5/iaPn2'; // Admin


/**
 * @param {import('next').NextApiRequest} req - request
 * @param {import('next').NextApiResponse} res - response
 */
export default async function handler(req, res) {
  try {
    await API.connectDB();

    if (req.method === 'POST') {
      if (req.body?.username === ADMIN_USERNAME && await bcrypt.compare(req.body?.password, ADMIN_PASSWORD)) {
        const refresh = jwt.sign({
          key: customAlphabet(' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~')(12),
          username: ADMIN_USERNAME,
          id: ADMIN_ID,
          time: new Date().toJSON()
        }, SECRET_REFRESH, { expiresIn: 60 * 60 * 24 * 7, algorithm: ALGORITHM });

        res.setHeader('Set-Cookie', cookie.serialize('token', refresh, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, path: '/' }));

        return res.status(200).json({
          user: {
            id: ADMIN_ID,
            fullname: ADMIN_FULLNAME,
            username: ADMIN_USERNAME,
            token: refresh
          }
        });
      };


      return res.status(200).json({ body: req.body });
    };

    throw new API.ErrorResponse(405);
  } catch (error) {
    if (error instanceof API.ErrorResponse) { return error.sand(res); };
    return new API.ErrorResponse(500).sand(res);
  }
};
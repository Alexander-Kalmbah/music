import API from '../../../lib/API';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';


const SECRET_ACCESS = 'S1>f&U[Za9S1\\_{3L@\'9.[;';
const SECRET_REFRESH = 'x/4Hh:r8JNB\\6}=iqY-`6EN-=heoc(-)Dh:rRxQzQ';


// TODO DELETE
/**
* @param {import('next').NextApiRequest} req - request
*/
const getClientIp = req => req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '';
/**
* @param {import('next').NextApiRequest} req - request
*/
const parseCookies = req => cookie.parse(req ? req.headers.cookie || "" : "");
/**
 * @param {import('next').NextApiResponse} res - response
 * @param {String} name - cookie key
 * @param {String} value - cookie value
 * @param {import('cookie').CookieSerializeOptions} options - cookie options
 */
const setCookies = (res, name, value, options = {}) => res.setHeader('Set-Cookie', cookie.serialize(name, value, options));


/**
* @param {import('next').NextApiRequest} req - request
*/
const checkAuth = async req => {
  try {
    const token = parseCookies(req)[API.COOKIE_AUTH];
    if (!token) throw new Error('token empty');

    const tokenPayload = JSON.parse(token); // id (userId), ip, key, time, access, refresh

    // TODO
    const accessPayload = jwt.verify(tokenPayload.access, SECRET_ACCESS, { algorithms: ['HS256', 'HS512'] });
    // TODO
    // TODO
    return {
      [API.KEY.TYPE]: 'AUTHORIZATION',
      user: null,
      roles: [],
      session: null
    };
  } catch (error) {
    throw new API.ErrorResponse(401);
  }
};


/**
 * @param {import('next').NextApiRequest} req - request
 * @param {import('next').NextApiResponse} res - response
 */
export default async function handler(req, res) {
  try {
    await API.connectDB();

    if (req.method === 'GET') {
      // const ip = getClientIp(req);
      // const now = API.nowHEX();
      // const cookies = parseCookies(req);
      // const token = jwt.sign({ key: 1}, SECRET_ACCESS, { expiresIn: 1000, algorithm: 'HS512' });

      // setCookies(res, 'token', JSON.stringify({
      //   ip,
      //   time: now,
      //   access: token
      // }), { maxAge: 1000 * 60 * 3, httpOnly: true, path: '/' });

      // const prev_access = JSON.parse(cookies['token']).access;

      // const verify = jwt.verify(prev_access, SECRET_ACCESS, { algorithms: ['HS512'] });

      // return res.status(200).json({
      //   ip, now, token, cookies,
      //   verify
      // });
      const userId = '0123456789ABCDEF';
      const sessionId = 'FEDCBA9876543210';

      const ip = getClientIp(req);
      const now = API.now();
      const nowHEX = API.nowHEX();
      const nowJSON = API.nowJSON();
      const cookies = parseCookies(req);

      const accessKey = customAlphabet(' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~')(21);
      const refreshKey = customAlphabet(' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~')(21);

      //const accessSecret = customAlphabet(' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~')(12);
      //const refreshSecret = customAlphabet(' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~')(14);

      const accessAlgorithm = 'HS256';
      const refreshAlgorithm = 'HS512';

      const accessLifetime = 60 * 60;
      const refreshLifetime = 60 * 60 * 24 * 7;

      const accessPayload = { type: 'ACCESS', lifetime: accessLifetime, key: accessKey, ip, user: userId, time: nowJSON };
      const refreshPayload = { type: 'REFRESH', lifetime: refreshLifetime, key: refreshKey, session: sessionId, time: nowJSON };

      const accessToken = jwt.sign(accessPayload, `${''}${SECRET_ACCESS}`, { expiresIn: accessLifetime, algorithm: accessAlgorithm });
      const refreshToken = jwt.sign(refreshPayload, `${''}${SECRET_REFRESH}`, { expiresIn: refreshLifetime, algorithm: refreshAlgorithm });

      const accessVerify = jwt.verify(accessToken, `${''}${SECRET_ACCESS}`, { algorithms: [accessAlgorithm] });
      const refreshVerify = jwt.verify(refreshToken, `${''}${SECRET_REFRESH}`, { algorithms: [refreshAlgorithm] });

      const tokenPayload = {
        [API.KEY.NAME]: 'TOKEN',
        ip,
        now, nowHEX, nowJSON,
        user: userId,
        session: sessionId,
        access: accessToken,
        refresh: refreshToken,
        ['--------']: '--------',
        accessVerify,
        refreshVerify
      };

      return res.status(200).json(tokenPayload);
    };

    throw new API.ErrorResponse(405);
  } catch (error) {
    if (error instanceof API.ErrorResponse) { return error.sand(res); };
    return new API.ErrorResponse(500).sand(res);
  }
};
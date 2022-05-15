import ErrorResponse from "../../../lib/ErrorResponse";
import { dbConnect } from "../../../lib/db";
import { parseCookies } from '../../../lib/cookie';
import jwt from 'jsonwebtoken';

// TODO DELETE
const IMAGE_SOURCE = '/api/image/c93ef8a2.A1CBFA6A.JPG';
const BOOKS = [
  {
    id: '1',
    name: 'Художница из Джайпура',
    author: 'Алка Джоши',
    time: '2021 г.',
    genres: ['Роман'],
    image: IMAGE_SOURCE
  },
  {
    id: '2',
    name: 'Сын полка',
    author: 'Валентин Катаев',
    time: '2022 г.',
    genres: ['Книги о войне', 'Внеклассное чтение'],
    image: ''
  },
  {
    id: '3',
    name: 'Недостающее звено. Сборник рассказов',
    author: 'Борис Штерн',
    time: '2022 г.',
    genres: ['Фантастика'],
    image: IMAGE_SOURCE
  }
];


const ALGORITHM = 'HS512';

const ADMIN_ID = '0';
const ADMIN_FULLNAME = 'Admin';
const ADMIN_USERNAME = 'Admin';

const SECRET_REFRESH = 'x/4Hh:r8JNB\\6}=iqY-`6EN-=heoc(-)Dh:rRxQzQ';
/** @param {import('next').NextApiRequest} req - request */
const checkAuth = async function (req) {
  try {
    const token = parseCookies(req)['token'];
    if (token && typeof (token) === 'string') {
      const { key, id, username, time } = jwt.verify(token, SECRET_REFRESH, { algorithms: [ALGORITHM] });
      if ((id == ADMIN_ID) && (username == ADMIN_USERNAME)) {
        return { id, username, time, key, fullname: ADMIN_FULLNAME };
      }
    };
    throw new ErrorResponse(401, 'client unauthorized');
  } catch {
    throw new ErrorResponse(401, 'client unauthorized');
  }
};

/**
* @param {import('next').NextApiRequest} req - request
* @param {import('next').NextApiResponse} res - response
*/
export default async function handler(req, res) {
  try {
    await dbConnect();
    const auth = await checkAuth(req);

    if (req.method === 'GET') { return res.status(200).send(BOOKS); };

    throw new ErrorResponse(405);
  } catch (error) {
    return (error instanceof ErrorResponse ? error : new ErrorResponse(500)).sand(res);
  }
};
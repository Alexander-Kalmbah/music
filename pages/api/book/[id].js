import ErrorResponse from "../../../lib/ErrorResponse";
import { dbConnect } from "../../../lib/db";

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


/**
* @param {import('next').NextApiRequest} req - request
* @param {import('next').NextApiResponse} res - response
*/
export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const book = BOOKS.find(book => book.id == req.query.id);
      if (book) { return res.status(200).send(book); };
      throw new ErrorResponse(404);
    };

    throw new ErrorResponse(405);
  } catch (error) {
    return (error instanceof ErrorResponse ? error : new ErrorResponse(500)).sand(res);
  }
};
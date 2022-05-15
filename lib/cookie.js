import cookie from 'cookie';

/**
* @param {import('next').NextApiRequest} req - request
*/
const parseCookies = req => cookie.parse(req ? req.headers.cookie || "" : document.cookie);
/**
 * @param {import('next').NextApiResponse} res - response
 * @param {String} name - cookie key
 * @param {String} value - cookie value
 * @param {import('cookie').CookieSerializeOptions} options - cookie options
 */
const setCookies = (res, name, value, options = {}) => res.setHeader('Set-Cookie', cookie.serialize(name, value, options));

export { cookie, parseCookies, setCookies };
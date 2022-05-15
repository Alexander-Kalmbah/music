

/**
* @param {import('next').NextApiRequest} req - request
*/
const getClientIp = req => req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '';

export { getClientIp };
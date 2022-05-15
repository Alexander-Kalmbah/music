import ErrorResponse from "../../../lib/ErrorResponse";

export default async function handler(req, res) {
  try {
    throw new ErrorResponse(404);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
import ErrorResponse from "../../../../lib/ErrorResponse";
import KEY from "../../../../src/constants/keys_property";
import { dbConnect } from "../../../../lib/db";


export default async function handler(req, res) {
  try {
    await dbConnect();

    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
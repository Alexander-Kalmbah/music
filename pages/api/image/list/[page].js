import ErrorResponse from "../../../../lib/ErrorResponse";
import imageFile from "../../../../src/model/ImageFile";
import { dbConnect } from "../../../../lib/db";
import { limit } from '../../../../lib/limit';
import KEY from "../../../../src/constants/keys_property";
import { STATUS_ENUM } from "../../../../src/constants/public";


//#region CONFIG
const PAGINATION_PAGE_DEFAULT = 0;
const PAGINATION_SIZE_DEFAULT = 30;
const PAGINATION_PAGE_STEP = 1;
const PAGINATION_SIZE_STEP = 1;
const PAGINATION_MIN_PAGE = 0;
const PAGINATION_MAX_PAGE = 0xffffffffff;
const PAGINATION_MIN_SIZE = 5;
const PAGINATION_MAX_SIZE = 120;
const PAGINATION_OPTIONS = {
  hiddenDisabled: true,
  hiddenDeleted: true,
  hiddenLocked: true,
};
const PAGINATION_SIZE_FRAMES = [5, 10, 15, 20, 30, 45, 60, 90, 100];  //???

const PAGINATION_META = {
  PAGE_DEFAULT: PAGINATION_PAGE_DEFAULT,
  SIZE_DEFAULT: PAGINATION_SIZE_DEFAULT,
  PAGE_STEP: PAGINATION_PAGE_STEP,
  SIZE_STEP: PAGINATION_SIZE_STEP,
  MIN_PAGE: PAGINATION_MIN_PAGE,
  MAX_PAGE: PAGINATION_MAX_PAGE,
  MIN_SIZE: PAGINATION_MIN_SIZE,
  MAX_SIZE: PAGINATION_MAX_SIZE,
  OPTIONS: PAGINATION_OPTIONS
};
//#endregion


export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method == 'GET') {
      const page = limit(Number(req.query.page || 0) | 0 || PAGINATION_PAGE_DEFAULT, PAGINATION_MIN_PAGE, PAGINATION_MAX_PAGE);
      const size = limit(Number(req.query.size || 0) | 0 || PAGINATION_SIZE_DEFAULT, PAGINATION_MIN_SIZE, PAGINATION_MAX_SIZE);
      const skip = page * size;

      const count = await imageFile.ImageFile.estimatedDocumentCount();
      const length = Math.ceil(count / size);

      const last = length - 1;
      const prev = page <= 0 ? null : page - 1;
      const next = page >= last ? null : page + 1;

      const images = await imageFile.ImageFile.find({}).limit(size).skip(skip).exec();
      const imagesDTO = images.map(i => i.toDTO());

      return res.status(200).json({
        [KEY.STATUS]: STATUS_ENUM.SUCCESS,
        [KEY.PAGINATION]: {
          [KEY.META]: PAGINATION_META,
          page, size, skip, count, length, last, prev, next
        },
        images: imagesDTO
      });
    };

    throw new ErrorResponse(405);
  } catch (error) {
    if (error instanceof ErrorResponse) { return error.sand(res); };
    return new ErrorResponse(500).sand(res);
  }
};
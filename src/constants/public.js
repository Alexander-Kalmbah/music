/* [GLOBAL CONSTANTS] */

//#region APP
export const APP_TITLE = 'MUSIC APP';
export const APP_LANGUAGE = 'ru';
export const APP_KEYWORDS = 'music, audio, sound, noise';
export const APP_DESCRIPTION = 'music app';

//#region PATH
export const PATH_API = '/api';
export const PATH_IMAGE = '/api/image';
export const PATH_AUDIO = '/api/audio';
//#endregion
//#endregion

//#region TIME
export const MILLISECOND = 1;
export const SECONDS = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;
export const DAY = 86400000;
export const WEEK = 604800000;
export const MONTH = 2592000000; // 30 days
//#endregion
//#region DAY_OF_WEEK
export const MONDAY = 'MONDAY';
export const TUESDAY = 'TUESDAY';
export const WEDNESDAY = 'WEDNESDAY';
export const THURSDAY = 'THURSDAY';
export const FRIDAY = 'FRIDAY';
export const SATURDAY = 'SATURDAY';
export const SUNDAY = 'SUNDAY';
//#endregion
//#region MONTHS
export const JANUARY = 'JANUARY';
export const FEBRUARY = 'FEBRUARY';
export const MARCH = 'MARCH';
export const APRIL = 'APRIL';
export const MAY = 'MAY';
export const JUNE = 'JUNE';
export const JULY = 'JULY';
export const AUGUST = 'AUGUST';
export const SEPTEMBER = 'SEPTEMBER';
export const OCTOBER = 'OCTOBER';
export const NOVEMBER = 'NOVEMBER';
export const DECEMBER = 'DECEMBER';
//#endregion

//#region CHARS
export const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const CHARS_NUMBER = '0123456789';
export const CHARS_SYMBOL = '_~!@#$&?№%^*-+/|\\:<>[]{}().';
//#endregion

//#region ALPHABET
export const ALPHABET_HEX = '0123456789ABCDEF';
export const ALPHABET_URL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALPHABET_FILENAME = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALPHABET_PASSKEY = ' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~';
//#endregion

//#region SIZE
//#endregion

//#region STATUS +
const KEY_ENUM_NAME = Symbol('ENUMNAME');
export const LOAD = {
  NONE: 0,
  ERROR: 1,
  LOADED: 2,
  LOADING: 3,
  [KEY_ENUM_NAME]: '#LOAD#'
};

// [modifier] way to create
export const CREATE = {
  STATIC: 0,
  DYNAMIC: 1
};

// condition | status | state
export const STATUS = {
  NONE: 'NONE',
  GOOD: 'GOOD',
  WARN: 'WARN',
  ERROR: 'ERROR',
  EMPTY: 'EMPTY'
};

export const STATUS_TYPE = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  FAILURE: 'FAILURE'
};
export const STATUS_ENUM = {
  DEFAULT: 0,
  SUCCESS: 1,
  WARNING: 2,
  FAILURE: 3,
};
export const STATUS_INFO = {
  [STATUS_ENUM.DEFAULT]: {
    key: 'DEFAULT',
    name: 'default',
    value: STATUS_ENUM.DEFAULT,
  },
  [STATUS_ENUM.SUCCESS]: {
    key: 'SUCCESS',
    name: 'ok',
    value: STATUS_ENUM.SUCCESS,
  },
  [STATUS_ENUM.WARNING]: {
    key: 'WARNING',
    name: 'warning',
    value: STATUS_ENUM.WARNING,
  },
  [STATUS_ENUM.FAILURE]: {
    key: 'FAILURE',
    name: 'error',
    value: STATUS_ENUM.FAILURE,
  }
};

export const ACCESS_MODIFIER = {
  PUBLIC: 0,
  PRIVATE: 1,
  PROTECTED: 2
};

//#endregion

//#region MAP RESPONSE
export const RESPONSE = {
  [200]: {
    code: 200,
    error: '',
    message: 'SUCCESS'
  },
  [400]: {
    code: 400, // неверный запрос
    error: '400 | BAD REQUEST',
    message: 'FAILURE'
  },
  [401]: {
    code: 401, // пользователь не авторизованный
    error: '401 | UNAUTHORIZED',
    message: 'FAILURE'
  },
  [403]: {
    code: 403, // нету прав
    error: '403 | FORBIDDEN',
    message: 'FAILURE'
  },
  [404]: {
    code: 404, // не найдено
    error: '404 | NOT FOUND',
    message: 'FAILURE'
  },
  [405]: {
    code: 405, // метод не поддерживается
    error: '405 | METHOD NOT ALLOWED',
    message: 'FAILURE'
  },
  [415]: {
    code: 415, // Медиа формат запрашиваемых данных не поддерживается сервером, поэтому запрос отклонён
    error: '415 | UNSUPPORTED MEDIA TYPE',
    message: 'FAILURE'
  },
  [500]: {
    code: 500, // сломался сервер
    error: '500 | INTERNAL SERVER',
    message: 'UNKNOWN ERROR'
  }
};
//#endregion

//#region FILE IMAGE
export const IMG_TYPE = [
  {
    name: 'APNG',
    exts: ['apng'],
    mime: 'image/apng'
  },
  {
    name: 'AVIF',
    exts: ['avif'],
    mime: 'image/avif'
  },
  {
    name: 'GIF',
    exts: ['gif'],
    mime: 'image/gif'
  },
  {
    name: 'JPEG',
    exts: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    mime: 'image/jpeg'
  },
  {
    name: 'PNG',
    exts: ['png'],
    mime: 'image/png'
  },
  {
    name: 'SVG',
    exts: ['svg'],
    mime: 'image/svg+xml'
  },
  {
    name: 'WebP',
    exts: ['webp'],
    mime: 'image/webp'
  },
  {
    name: 'BMP',
    exts: ['bmp'],
    mime: 'image/bmp'
  },
  {
    name: 'ICO',
    exts: ['ico', 'cur'],
    mime: 'image/x-icon'
  },
  {
    name: 'TIFF',
    exts: ['tif', 'tiff'],
    mime: 'image/tiff'
  }
];
//#endregion

//#region TYPE INSTANCE
export const INSTANCE_TYPE = {
  INTERFACE: 'INTERFACE',
  NAMESPACE: 'NAMESPACE',
  CLASS: 'CLASS',
  ENUM: 'ENUM'
};
//#endregion

//#region LIFETIME
export const LIFETIME_ACCESS_TOKEN = 20 * MINUTE;
export const LIFETIME_REFRESH_TOKEN = 2 * MONTH;
export const LIFETIME_COOKIE_AUTH = LIFETIME_REFRESH_TOKEN + DAY;
//#endregion

//#region SEX
export const SEX_MALE = '[SEX]:MALE'; // мужчина
export const SEX_FEMALE = '[SEX]:FEMALE'; // женщина
export const SEX_SEXLESS = '[SEX]:SEXLESS'; // бесполый

export const SEX = {
  SEXLESS: 0,
  MALE: 1,
  FEMALE: 2
};
//#endregion

//#region STATIC KEYS
export const VOID = '[VOID]';
export const WAIT = '[WAIT]';
export const GOOD = '[GOOD]';
export const ERROR = '[ERROR]';
export const EMPTY = '[EMPTY]';
export const DELETE = '[DELETE]';
export const SUCCESS = '[SUCCESS]';
export const WARNING = '[WARNING]';
export const FAILURE = '[FAILURE]';
export const STATIC_KEYS = { VOID, WAIT, GOOD, ERROR, EMPTY, DELETE, SUCCESS, WARNING, FAILURE };
//#endregion

//#region HEADERS
export const HEADERS = {
  ACCESS_SOURCE: 'passkey-source',
  CLIENT_DEVICE: 'client-device',
  CLIENT_IP: 'client-ip',
  USER_ID: 'user-id',
  IMAGE_ID: 'image-id',
  FILE_TYPE: 'file-type',
  INITIAL_SIZE: 'initial-sizes',
  FIT: 'resize-fit',
  ACCESS: 'access',
};

export const COOKIE_AUTH = 'auth';
//#endregion

//#region PAGINATION
export const PAGINATION = {
  PAGE: {
    DEFAULT: 0,
    STEP: 1,
    MIN: 0,
    MAX: 0xffffffffff
  },
  SIZE: {
    DEFAULT: 30,
    STEP: 1,
    MIN: 5,
    MAX: 120
  },
  SKIP: {
    DEFAULT: 0,
    STEP: 1,
    MIN: 0,
    MAX: 0xffffffffff
  },
  OPTIONS: {
    hiddenLocked: true,
    hiddenDeleted: true,
    hiddenDisabled: true,
  }
};
//#endregion

//#region DISPOSITION
export const DISPOSITION = {
  ATTACHMENT: 'attachment',
  INLINE: 'inline'
};
//#endregion

//#region FILE TYPE
export const FILE_TYPE = {};
//#endregion


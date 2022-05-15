import { customAlphabet } from 'nanoid';
import KEY from '../src/constants/keys_property';
import { RESPONSE, ALPHABET_PASSKEY, STATUS_ENUM } from '../src/constants/public';
import { nowJSON } from './time';

const MAP_ERROR_RESPONSE = {};
for (const code in RESPONSE) {
  if (Object.hasOwnProperty.call(RESPONSE, code)) {
    if (RESPONSE[code].error) { MAP_ERROR_RESPONSE[code] = RESPONSE[code]; }
  }
};


const ErrorResponse = class extends Error {
  static MAP_ERROR_RESPONSE = MAP_ERROR_RESPONSE;
  static [KEY.TYPE] = 'ERROR_RESPONSE<INTERFACE>';
  static TYPE_EXAMPLE_DTO = 'ERROR_RESPONSE<DTO>';
  static TYPE_EXAMPLE = 'ERROR_RESPONSE';

  static keyOptions = Symbol('[OPTIONS]');
  static options = { language: 'en', stack: false, icon: null };

  code = 500;
  title = 'ERROR';
  description = '';

  constructor(code, description = '', options = {}, payload = {}) {
    const res = MAP_ERROR_RESPONSE[code] || MAP_ERROR_RESPONSE[500];

    super(res.message);

    const optionsJoint = { ...this.constructor.options, ...options };
    const lang = {
      code: 'en',
      map: {
        msg: res.message,
        error: res.error,
      }
    };

    this[KEY.TYPE] = this.constructor.TYPE_EXAMPLE;
    this[KEY.LANG] = lang;
    this[KEY.DATE] = nowJSON();
    this[KEY.META] = { initialOptions: options };
    this[KEY.SECURE] = this.constructor.createSecure();

    this.code = res.code;
    this.title = res.error;
    this.description = description;

    this[this.constructor.keyOptions] = optionsJoint;
  };

  static createSecure() {
    return customAlphabet(ALPHABET_PASSKEY, 32);
  };
  createSecure() {
    return (this[KEY.SECURE] = customAlphabet(ALPHABET_PASSKEY, 32));
  };

  toDTO() {
    const dto = {
      [KEY.STATUS]: STATUS_ENUM.FAILURE,
      [KEY.DTO]: true,
      [KEY.TYPE]: this.constructor.TYPE_EXAMPLE_DTO,
      [KEY.RES_ERROR]: this.title,

      code: this.code,
      message: this.message,
      description: this.description,

      metadata: {
        date: this[KEY.DATE],
        lang: this[KEY.LANG],
        secure: this[KEY.SECURE]
      }
    };

    const opt = this[this.constructor.keyOptions];
    if (opt.icon) { dto.icon = opt.icon; };
    if (opt.stack) { dto.stack = this.stack; };

    return dto;
  };

  /**
  * @param {import('next').NextApiResponse} res - response
  */
  sand(res) {
    res.status(this.code).json(this.toDTO());
  };
};

export default ErrorResponse;
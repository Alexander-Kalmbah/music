import { nanoid, customAlphabet } from 'nanoid';
import { INSTANCE_TYPE, ALPHABET_HEX, ALPHABET_URL, ALPHABET_PASSKEY } from '../src/constants/public';

const SIZE_KEY_DEFAULT = 16;
const MIN_SIZE_KEY = 4;
const MAX_SIZE_KEY = 64;

const MAX_LENGTH_NAMESPACE = 99;

const MAX_INDEX = 0xFFFFFFFF;


const PRIVATE_KEY_CREATE = Symbol('CREATE');
const PRIVATE_KEY_INCREMENT = Symbol('INCREMENT');
const PRIVATE_KEY_CHECK_NAMESPACE = Symbol('CHECK_NAMESPACE');
const PRIVATE_KEY_CHECK_SIZE_KEY = Symbol('CHECK_SIZE_KEY');


const INITIAL_INDEX = Math.random() * (MAX_INDEX + 1) | 0;


const Secure = class {
  static instanceType = INSTANCE_TYPE.CLASS;

  static nanoid = nanoid;
  static nanoidHEX = customAlphabet(ALPHABET_HEX);
  static nanoidURL = customAlphabet(ALPHABET_URL);
  static nanoidPass = customAlphabet(ALPHABET_PASSKEY);

  static ALPHABET_KEY_HEX = ALPHABET_HEX;
  static ALPHABET_KEY_URL = ALPHABET_URL;
  static ALPHABET_KEY_PASS = ALPHABET_PASSKEY;

  static SIZE_KEY_DEFAULT = SIZE_KEY_DEFAULT;
  static MIN_SIZE_KEY = MIN_SIZE_KEY;
  static MAX_SIZE_KEY = MAX_SIZE_KEY;

  static MAX_LENGTH_NAMESPACE = MAX_LENGTH_NAMESPACE;

  static MAX_INDEX = MAX_INDEX;
  static INITIAL_INDEX = INITIAL_INDEX;

  static _index = MAX_INDEX;
  static _name = 'SECURE';


  _id = '';

  key = '';
  time = '';
  index = 0;
  namespace = '';

  sizeKey = SIZE_KEY_DEFAULT;
  isPass = false;

  constructor(namespace = '', isPasskey = false, size = SIZE_KEY_DEFAULT) {
    this.isPass = isPasskey;
    this.time = this.isPass ? (new Date()).toJSON() : `${Date.now()}`;

    this.index = this.constructor._index;
    this.sizeKey = this.constructor[PRIVATE_KEY_CHECK_SIZE_KEY](size);
    this.namespace = namespace ? this.constructor[PRIVATE_KEY_CHECK_NAMESPACE](namespace) : '';

    this.key = (this.isPass ? this.constructor.nanoidPass : this.constructor.nanoidURL)(this.sizeKey);
    this._id = this.create();
    this.constructor[PRIVATE_KEY_INCREMENT]();

    return this;
  };

  static create(namespace = '', isPasskey = false, size = SIZE_KEY_DEFAULT) {
    const time = isPasskey ? (new Date()).toJSON() : `${Date.now()}`;
    const index = this[PRIVATE_KEY_INCREMENT]();
    const key = (isPasskey ? this.nanoidPass : this.nanoidURL)(size);
    const ns = namespace ? this[PRIVATE_KEY_CHECK_NAMESPACE](namespace) : '';

    return this[PRIVATE_KEY_CREATE](ns, time, key, index);
  };
  create() { return this._id = this.constructor[PRIVATE_KEY_CREATE](this.namespace, this.time, this.key, this.index); };

  static [PRIVATE_KEY_CREATE](namespace = '', time = '', key = '', index = 0) { return `${(namespace && `${namespace}.`) || ''}${time}.${index}.${key}`; };
  static [PRIVATE_KEY_INCREMENT]() { return this._index = this._index + 1 % MAX_INDEX; };
  static [PRIVATE_KEY_CHECK_NAMESPACE](namespace) {
    if (!namespace) return '';
    if (typeof (namespace) !== 'string') return '';
    if (namespace.length > MAX_LENGTH_NAMESPACE) return namespace.substring(0, MAX_LENGTH_NAMESPACE);
    return namespace;
  };
  static [PRIVATE_KEY_CHECK_SIZE_KEY](size) {
    if (!size) return SIZE_KEY_DEFAULT;
    if (typeof (size) !== 'number') return SIZE_KEY_DEFAULT;
    size = size | 0;
    if (size < MIN_SIZE_KEY) return MIN_SIZE_KEY;
    if (size > MAX_SIZE_KEY) return MAX_SIZE_KEY;
    return size;
  };

  get name() { return this.constructor._name; };
  get globalIndex() { return this.constructor._index; };
};

export default Secure;
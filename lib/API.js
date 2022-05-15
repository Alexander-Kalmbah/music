import KEY from '../src/constants/keys_property';
import {
  PATH_API, LOAD, CREATE, STATUS, STATUS_TYPE, RESPONSE, IMG_TYPE, INSTANCE_TYPE,
  LIFETIME_ACCESS_TOKEN, LIFETIME_REFRESH_TOKEN, LIFETIME_COOKIE_AUTH,
  STATIC_KEYS, COOKIE_AUTH, HEADERS, PAGINATION, DISPOSITION
} from '../src/constants/public';
import { MONGO_META, MONGO_ERROR, MONGO_LOCATION, dbConnect } from './db';
import ErrorResponse from './ErrorResponse';
import imageFile from '../src/model/ImageFile';
import { limit } from './limit';
import Secure from './Secure';
import { now, nowJSON, nowHEX } from './time';


class IAPINamespace {
  static instanceType = INSTANCE_TYPE.INTERFACE;

  name = 'API_NAMESPACE';
  version = '0.1.0';
  route = PATH_API;
  routeManifest = `${PATH_API}/manifest`;


  logs = [];

  constructor() {
    if (this.constructor.instance) return this.constructor.instance;

    this.timeInitialization = new Date();
    return this.constructor.instance = this;
  };

  async connectDB() { return await dbConnect(); };
};

const API = new (class APINamespace extends IAPINamespace {
  static instanceType = INSTANCE_TYPE.NAMESPACE;

  // CONSTANTS
  MONGO_META = MONGO_META;
  MONGO_ERROR = MONGO_ERROR;
  MONGO_LOCATION = MONGO_LOCATION;

  KEY = KEY;

  PATH_API = PATH_API;
  LOAD = LOAD;
  CREATE = CREATE;
  STATUS = STATUS;
  STATUS_TYPE = STATUS_TYPE;
  RESPONSE = RESPONSE;
  IMG_TYPE = IMG_TYPE;
  INSTANCE_TYPE = INSTANCE_TYPE;
  LIFETIME_ACCESS_TOKEN = LIFETIME_ACCESS_TOKEN;
  LIFETIME_REFRESH_TOKEN = LIFETIME_REFRESH_TOKEN;
  LIFETIME_COOKIE_AUTH = LIFETIME_COOKIE_AUTH;
  STATIC_KEYS = STATIC_KEYS;
  COOKIE_AUTH = COOKIE_AUTH;
  HEADERS = HEADERS;
  DISPOSITION = DISPOSITION;
  PAGINATION = PAGINATION;


  // CLASSES
  ErrorResponse = ErrorResponse;
  Secure = Secure;

  // MODELS
  imageFile = imageFile;

  // FUNCTION
  limit = limit;
  now = now;
  nowJSON = nowJSON;
  nowHEX = nowHEX;

  constructor() {
    super();
  };


});


export default API;
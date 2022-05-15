import mongoose from 'mongoose';
import path from 'path';
import KEY from '../constants/keys_property';
import { IMG_TYPE, LOAD, CREATE, STATUS, STATUS_TYPE, STATUS_ENUM, STATIC_KEYS } from '../constants/public';


const Schema = mongoose.Schema;
const model = (name, schema, connectionName) => { try { return mongoose.model(name); } catch (error) { return mongoose.model(name, schema, connectionName); } };

const IMAGE_FILE_NAME_MODEL = 'IMAGE_FILE';
const IMAGE_FILE_NAME_CONNECTION = 'IMAGE';
const IMAGE_FILE_TYPE = 'IMAGE_FILE';
const IMAGE_FILE_VERSION = '0.1.0';
const IMAGE_FILE_UPLOAD_DIRECTORY = path.resolve('.', 'upload');
const IMAGE_FILE_TO_DTO_OPTIONS = {
  time: false,
  version: false,
  timeChange: false,
  imageType: false
};


const METADATA = {
  name: IMAGE_FILE_NAME_MODEL,
  connection: IMAGE_FILE_NAME_CONNECTION,
  type: IMAGE_FILE_TYPE,
  version: IMAGE_FILE_VERSION,
  dir: IMAGE_FILE_UPLOAD_DIRECTORY,
  optsToDTO: IMAGE_FILE_TO_DTO_OPTIONS
};

const imageFileSchema = new Schema({
  key: { type: String, default: '', required: true },
  name: { type: String, default: '', required: true },

  type: { type: String, default: undefined },

  ext: { type: String, required: true },
  mimetype: { type: String, required: true, enum: IMG_TYPE.map(type => type.mime) },

  filename: { type: String, default: '' },
  originalFilename: { type: String, alias: 'initialFilename' },
  size: { type: Number, min: 0, default: 0 },

  width: { type: Number, min: 0, default: 0, required: true },
  height: { type: Number, min: 0, default: 0, required: true },

  access: { type: String, default: undefined },
  secret: { type: String, default: undefined },

  status: {
    code: { type: String, default: undefined },
    timeChange: { type: Date, default: undefined }
  },

  isAlpha: { type: Boolean },
  ratio: {
    common: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },

  [KEY.TIME_CREATE]: { type: Date, default: Date.now },
  [KEY.TIME_UPDATE]: { type: Date, default: Date.now },
  [KEY.TIME_DELETE]: { type: Date, default: undefined }
});

imageFileSchema.methods.toDTO = function (options = {}) {
  const opts = { ...IMAGE_FILE_TO_DTO_OPTIONS, ...options };
  const time = new Date();

  const result = {
    [KEY.DTO]: 1,
    [KEY.TYPE]: IMAGE_FILE_TYPE,

    id: this._id,
    key: this.key,
    type: this.type,
    ext: this.ext,
    mimetype: this.mimetype,
    filename: this.filename,
    originalFilename: this.originalFilename,
    size: this.size,
    width: this.width,
    height: this.height,
    access: this.access,
    isAlpha: this.isAlpha,
    ratio: this.ratio
  };

  if (opts.time) result[KEY.TIME] = time.toJSON();
  if (opts.version) result[KEY.VERSION] = IMAGE_FILE_VERSION;
  if (opts.timeChange) {
    result[KEY.TIME_CREATE] = this[KEY.TIME_CREATE];
    result[KEY.TIME_UPDATE] = this[KEY.TIME_UPDATE];
    result[KEY.TIME_DELETE] = this[KEY.TIME_DELETE];
  };
  if (opts.imageType) result[KEY.FILE] = IMG_TYPE.find(type => this.mimetype === type.mime) || null;

  return result;
};

const ImageFileModel = model(IMAGE_FILE_NAME_MODEL, imageFileSchema, IMAGE_FILE_NAME_CONNECTION);

// TODO
const createImageFile = async () => { };
const checkAccessFile = async () => { };


const imageFile = {
  meta: METADATA,
  schema: imageFileSchema,
  ImageFile: ImageFileModel
};

export default imageFile;
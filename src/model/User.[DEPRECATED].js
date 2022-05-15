import mongoose from 'mongoose';
import KEY from '../constants/keys_property';
import { SEX } from '../constants/public';

const Schema = mongoose.Schema;
const model = (name, schema, connectionName) => { try { return mongoose.model(name); } catch (error) { return mongoose.model(name, schema, connectionName); } };

const USER_NAME_TYPE = 'USER';
const USER_NAME_MODEL = 'USER';
const USER_NAME_CONNECTION = 'USER';

const MIN_SIZE_NAME = 0;
const MAX_SIZE_NAME = 48;

const METADATA = {
  type: USER_NAME_TYPE,
  name: USER_NAME_MODEL,
  connection: USER_NAME_CONNECTION,

  minSizeName: MIN_SIZE_NAME,
  maxSizeName: MAX_SIZE_NAME,
};

const userSchema = new Schema({
  avatar: { type: Schema.Types.ObjectId },
  username: { type: String, required: true },
  password: { type: String, required: true },

  name: { type: String, default: '', minlength: MIN_SIZE_NAME, maxlength: MAX_SIZE_NAME },
  sex: { type: Number, default: SEX.SEXLESS },

  sessions: { type: [Schema.Types.ObjectId], default: [] },
  timeInit: { type: Date, default: Date.now },
  settings: { type: Schema.Types.Mixed },
  roles: { type: [String], default: [] }
});

userSchema.methods.toDTO = function (options = {}) {
  const result = {
    [KEY.DTO]: true,
    [KEY.TYPE]: USER_NAME_TYPE,

    id: this._id,
    sex: this.sex || SEX.SEXLESS,
    name: this.name,

    avatar: this.avatar,
    username: this.username,

    sessionIds: this.sessions,
    roles: this.roles || [],
    settings: this.settings || {},
    timeInit: this.timeInit
  };

  return result;
};

const UserModel = model(USER_NAME_MODEL, userSchema, USER_NAME_CONNECTION);

export const user = {
  meta: METADATA,
  UserModel,
  userSchema,
};
export default UserModel;
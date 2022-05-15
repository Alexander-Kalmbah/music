import mongoose from 'mongoose';
import KEY from '../constants/keys_property';
import { SEX } from '../constants/public';

const Schema = mongoose.Schema;
const model = (name, schema, connectionName) => { try { return mongoose.model(name); } catch (error) { return mongoose.model(name, schema, connectionName); } };


const USER_NAME_TYPE = 'USER';
const USER_NAME_MODEL = 'USER';
const USER_NAME_CONNECTION = 'USER';

const METADATA = {
  type: USER_NAME_TYPE,
  name: USER_NAME_MODEL,
  connection: USER_NAME_CONNECTION
};


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

  name: { type: String },
  surname: { type: String },
  birthday: { type: Date },
  sex: { type: Number, default: SEX.SEXLESS },

  session: { type: mongoose.Types.Map, default: null }
});

userSchema.methods.toDTO = function () {
  return {
    [KEY.DTO]: true,
    [KEY.TYPE]: USER_NAME_TYPE,

    ...this
  };
};

const UserModel = model(USER_NAME_MODEL, userSchema, USER_NAME_CONNECTION);

export const user = {
  meta: METADATA,
  UserModel,
  userSchema,
};
export default UserModel;
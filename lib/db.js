import mongoose from "mongoose";
import ErrorResponse from "./ErrorResponse";

//#region CONFIG
const MONGO_META = {
  name: 'mongo'
};

const MONGO_ERROR = {
  BAD_CONNECT: {
    description: 'ERROR FAILURE CONNECT DB',
    payload: {}
  }
};

const MONGO_PROTOCOL = 'mongodb:';
const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_NAME = '/test';

const MONGOOSE_URI = `${MONGO_PROTOCOL}//${MONGO_HOST}:${MONGO_PORT}${MONGO_NAME}`;
const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 10000
};

const MONGO_LOCATION = {
  PROTOCOL: MONGO_PROTOCOL,
  HOST: MONGO_HOST,
  PORT: MONGO_PORT,
  NAME: MONGO_NAME,
  URI: MONGOOSE_URI,
  OPTIONS: MONGOOSE_OPTIONS
};
//#endregion


const cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

const dbConnect = async function () {
  try {
    if (cached.conn) return cached.conn;
    if (!cached.promise) cached.promise = mongoose.connect(MONGOOSE_URI, MONGOOSE_OPTIONS).then(mongoose => mongoose);
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // TODO save error in logs
    const { description, payload } = MONGO_ERROR.BAD_CONNECT;
    throw new ErrorResponse(500, description, { initial: error }, payload);
  }
};

export {
  mongoose,
  MONGO_META,
  MONGO_ERROR,
  MONGO_LOCATION,
  dbConnect
};


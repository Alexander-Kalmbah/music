const KEY_PROPERTY_PREFIX = '#[KEY]:';
const KEY_PROPERTY_POSTFIX = '#';

const build = key => `${KEY_PROPERTY_PREFIX}${key}${KEY_PROPERTY_POSTFIX}`;

const KEY = {
  ID: build`ID`,
  DTO: build`DTO`,
  KEY: build`KEY`,
  NAME: build`NAME`,
  TYPE: build`TYPE`,
  META: build`META`,
  LOAD: build`LOAD`,
  CODE: build`CODE`,
  SAVE: build`SAVE`,
  TIME: build`TIME`,
  DATE: build`DATE`,
  LANG: build`LANG`,
  HASH: build`HASH`,
  PREV: build`PREV`,
  NEXT: build`NEXT`,
  FILE: build`FILE`,
  ERROR: build`ERROR`,
  STATUS: build`STATUS`,
  STATIC: build`STATIC`,
  SECRET: build`SECRET`,
  SECURE: build`SECURE`,
  DELETE: build`DELETE`,
  SUCCESS: build`SUCCESS`,
  WARNING: build`WARNING`,
  FAILURE: build`FAILURE`,
  VERSION: build`VERSION`,
  SETTINGS: build`SETTINGS`,
  RES_ERROR: build`ERROR_RESPONSE`,
  PAGINATION: build`PAGINATION`,
  TIME_CREATE: build`TCREATE`,
  TIME_UPDATE: build`TUPDATE`,
  TIME_DELETE: build`TDELETE`,
};

export default KEY;
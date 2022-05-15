const STATUS_ENUM = {
  DEFAULT: 0,
  SUCCESS: 1,
  WARNING: 2,
  FAILURE: 3,
};

const STATUS_KEYS = {
  0: 'DEFAULT',
  1: 'SUCCESS',
  2: 'WARNING',
  3: 'FAILURE',
};

const STATUS_LIST = ['DEFAULT', 'SUCCESS', 'WARNING', 'FAILURE'];

const STATUS_ARRAY = [
  { key: 'DEFAULT', value: 0 },
  { key: 'SUCCESS', value: 1 },
  { key: 'WARNING', value: 2 },
  { key: 'FAILURE', value: 3 }
];


export default STATUS = { ...STATUS_ENUM };

export { STATUS_ENUM, STATUS_KEYS, STATUS_LIST, STATUS_ARRAY };
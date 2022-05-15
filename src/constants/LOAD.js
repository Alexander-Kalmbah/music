const LOAD_ENUM = {
  NONE: 0,
  ERROR: 1,
  LOADED: 2,
  LOADING: 3,
};

const LOAD_KEYS = {
  0: 'NONE',
  1: 'ERROR',
  2: 'LOADED',
  3: 'LOADING',
};

const LOAD_LIST = ['NONE', 'ERROR', 'LOADED', 'LOADING'];

const LOAD_ARRAY = [
  { key: 'NONE', value: 0 },
  { key: 'ERROR', value: 1 },
  { key: 'LOADED', value: 2 },
  { key: 'LOADING', value: 3 },
];

const LOAD = { ...LOAD_ENUM };

export default LOAD;
export { LOAD_ENUM, LOAD_KEYS, LOAD_LIST, LOAD_ARRAY };
import ACTION from '../constants/action';

const initialState = {
  name: process.env.APP_NAME || '',
  lang: process.env.APP_LANG || '',
  version: process.env.APP_VERSION || '',

  title: ''
};

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION.REQ_CHECK_AUTH: return reqCheckAuth(state, action.payload);
    default: return state;
  };
};

// --------

const reqCheckAuth = function (state, payload) {

};
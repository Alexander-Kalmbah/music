import { createStore, compose } from "redux";
import { rootReducer } from "./rootReducer";

var store = null;

(() => {
  try {
    store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
  } catch (error) {
    store = createStore(rootReducer);
  }
})();

export default store;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/content/App';
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'antd/dist/antd.css';

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/indexReducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistMiddleware = (store) => (next) => (action) => {
  const retorno = next(action);
  const str = JSON.stringify({ data: store.getState() });
  window.localStorage.setItem("SAVESTATE", str);
  return retorno;
}

const savedstr = window.localStorage.getItem("SAVESTATE") || "{}";
const initialstate = JSON.parse(savedstr).data;

let store = createStore(
  rootReducer,
  initialstate,
  composeEnhancers( applyMiddleware( thunkMiddleware, persistMiddleware ) )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
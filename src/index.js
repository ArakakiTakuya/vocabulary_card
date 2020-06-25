import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  words: [],
  openStatus: false,
  btnType: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WORDS":
      return {
        ...state,
        words: action.words,
      };
    case "SET_OPEN_STATUS":
      return {
        ...state,
        openStatus: action.openStatus,
        btnType: action.btnType,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

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
  targetWordId: "",
  inputWord: "",
  inputMeaning: "",
};

function reducer(state = initialState, action) {
  const copy = [...state.words];
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
    case "SET_TARGET_WORD_ID":
      return {
        ...state,
        targetWordId: action.targetWordId,
      };
    case "DELETE_TARGET_WORD":
      const newWordsArray = copy.filter(
        (word) => String(word.Id) !== action.targetWordId
      );
      return {
        ...state,
        words: newWordsArray,
      };
    case "ADD_NEW_WORD":
      copy.push(action.newWord);
      return {
        ...state,
        words: copy,
      };
    case "SET_INPUT_WORD":
      return {
        ...state,
        inputWord: action.inputWord,
      };
    case "SET_INPUT_MEANING":
      return {
        ...state,
        inputMeaning: action.inputMeaning,
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

import React from "react";
import ReactDOM from "react-dom";

//import { Provider } from "react-redux";
import "./index.css.js";
import "./i18n/i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import configureStore from "data/store";

//const store = configureStore();
ReactDOM.render(
  //<Provider store={store}>
  <App />,
  //</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

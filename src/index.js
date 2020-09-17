import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";

import * as de from "react-intl/locale-data/de";
import * as serviceWorker from "./serviceWorker";

import { IntlProvider, addLocaleData } from "react-intl";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

addLocaleData([...de]);

ReactDOM.render(
  <IntlProvider locale="de">
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

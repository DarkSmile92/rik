import "./index.css";

import * as de from "react-intl/locale-data/de";
import * as serviceWorker from "./serviceWorker";

import { IntlProvider, addLocaleData } from "react-intl";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

// const theme = {
//   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
// };

addLocaleData([...de]);

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#007bff"
    }
  }
});

ReactDOM.render(
  <IntlProvider locale="de">
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

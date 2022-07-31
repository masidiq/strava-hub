import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
import moment from "moment";
import "moment/dist/locale/id";
moment.defaultFormat = "YYYY-MM-DD";
import store from "./redux/store";
import { Provider } from "react-redux";

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      muted: {
        default: "gray.500",
        _dark: "gray.400",
      },

      ["bg.gray"]: {
        default: "gray.100",
        _dark: "gray.700",
      },
    },
  },
});
import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer } = createStandaloneToast();
import ReactGA from "react-ga";
import Router from "./router";

const TRACKING_ID = "UA-220438183-5"; // OUR_TRACKING_ID

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <Router />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

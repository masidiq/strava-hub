import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

import store from "./redux/store";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/dist/locale/id";
moment.defaultFormat = "YYYY-MM-DD";
moment.locale("id", {
  relativeTime: {
    future: "dalam %s",
    past: "%s lalu",
    s: "beberapa detik",
    ss: "%d detik",
    m: "semenit",
    mm: "%d menit",
    h: "sejam",
    hh: "%d jam",
    d: "sehari",
    dd: "%d hari",
    M: "1 bulan",
    MM: "%d bulan",
    y: "1 tahun",
    yy: "%d tahun",
  },
});

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      muted: {
        default: "#9d9d9d",
        _dark: "#7c7c7c",
      },

      ["bg.gray"]: {
        default: "gray.100",
        _dark: "gray.700",
      },
      ["bg.default"]: {
        default: "var(--chakra-colors-chakra-body-bg)",
      },
      ["bg.base"]: {
        default: "#f9f9f9",
        _dark: "#14181e",
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

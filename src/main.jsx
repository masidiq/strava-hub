import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/home";
import SalasaKahiji from "./pages/salasa-kahiji";
import GblaLoop from "./pages/gbla-loop";
import KbpLoop from "./pages/kbp-loop";
import SegmentList from "./pages/segment";
import SegmentDetail from "./pages/segment/_id";
import AdminSegment from "./pages/admin/segment";
import Admin from "./pages/admin";

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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="salasa-kahiji" element={<SalasaKahiji />} />
              <Route path="gbla-loop" element={<GblaLoop />} />
              <Route path="kbp-loop" element={<KbpLoop />} />

              <Route path="segment">
                <Route path="" element={<SegmentList />} />
                <Route path=":id" element={<SegmentDetail />} />
                <Route path=":id/:date" element={<SegmentDetail />} />
              </Route>
            </Route>

            <Route path="admin" element={<AdminLayout />}>
              <Route path="" element={<Admin />} />
              <Route path="segment/:id" element={<AdminSegment />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

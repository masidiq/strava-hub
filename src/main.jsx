import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Layout from "./components/Layout";
import Home from "./pages/home";
import SalasaKahiji from "./pages/salasa-kahiji";
import GblaLoop from "./pages/gbla-loop";
import KbpLoop from "./pages/kbp-loop";
import SegmentList from "./pages/segment-list";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

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

root.render(
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="salasa-kahiji" element={<SalasaKahiji />} />
          <Route path="gbla-loop" element={<GblaLoop />} />
          <Route path="kbp-loop" element={<KbpLoop />} />
          <Route path="segment-list" element={<SegmentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

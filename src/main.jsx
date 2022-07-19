import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.css";
import { ChakraProvider, Button } from "@chakra-ui/react";

import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/index";
import SalasaKahiji from "./pages/salasa-kahiji";
import GblaLoop from "./pages/gbla-loop";
import KbpLoop from "./pages/kbp-loop";
import Other from "./pages/other";

import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="salasa-kahiji" element={<SalasaKahiji />} />
          <Route path="gbla-loop" element={<GblaLoop />} />
          <Route path="kbp-loop" element={<KbpLoop />} />
          <Route path="other" element={<Other />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

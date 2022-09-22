import ReactGA from "react-ga";
const TRACKING_ID = "UA-163692956-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

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
import KangPhoto from "./pages/admin/kang-photo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import eqStaticData from "./helpers/eqStaticData";

export default function Router() {
  let listSegmentPath = eqStaticData.segmentPaths.map((o) => o.path);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          {listSegmentPath.map((item, i) => (
            <Route path={item} key={i}>
              <Route path="" element={<SegmentDetail />} />
              <Route path=":date" element={<SegmentDetail />} />
            </Route>
          ))}

          <Route path="segment">
            <Route path="" element={<SegmentList />} />
            <Route path=":id" element={<SegmentDetail />} />
            <Route path=":id/:date" element={<SegmentDetail />} />
          </Route>
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="" element={<Admin />} />
          <Route path="segment/:id" element={<AdminSegment />} />
          <Route path="kang-photo" element={<KangPhoto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

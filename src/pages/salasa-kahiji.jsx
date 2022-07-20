import React, { useState, useEffect } from "react";

import segmentSvc from "../services/segmentService";
import AthleteList from "../components/AthleteList";
import SegmentHeader from "../components/SegmentHeader";

export default function Page() {
  const [segment, setSegment] = useState({
    Athletes: [],
  });

  function loadData() {
    segmentSvc.getOne().then((response) => {
      setSegment(response);
      console.log("get segment");
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <SegmentHeader />
      <AthleteList athletes={segment.Athletes} />
    </>
  );
}

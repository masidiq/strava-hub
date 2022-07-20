import React, { useState, useEffect } from "react";

import segmentSvc from "../services/segmentService";
import AthleteList from "../components/AthleteList";
import SegmentHeader from "../components/SegmentHeader";

export default function Page() {
  const [segment, setSegment] = useState({
    Athletes: [],
  });

  let segmentDetail = {
    name: "RSHS GH - Lembang",
    distance: "12.3",
    elevation: "200",
    gradient: "0",
  };

  // INITIAL
  useEffect(() => {
    segmentSvc.getOne().then((response) => {
      setSegment(response);
    });
  }, []);

  return (
    <>
      <SegmentHeader {...segmentDetail} />
      <AthleteList athletes={segment.Athletes} />
    </>
  );
}

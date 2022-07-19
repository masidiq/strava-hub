import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import segmentSvc from "../services/segmentService";

import AthleteList from "../components/AthleteList";

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

  // init
  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <Text fontWeight="bold" fontSize="xl">
        SALASA KAHIJI
      </Text>

      <AthleteList athletes={segment.Athletes} />
    </section>
  );
}

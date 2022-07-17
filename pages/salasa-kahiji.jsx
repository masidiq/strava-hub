import Layout from "../components/layout";
import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import segmentSvc from "../services/segmentService";
import { Button } from "@chakra-ui/react";

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

      <ul>
        {segment.Athletes.map((athlete, index) => (
          <li key={index}>{athlete.Name}</li>
        ))}
      </ul>
    </section>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

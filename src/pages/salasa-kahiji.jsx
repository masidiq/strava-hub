import { Text, Box, Flex } from "@chakra-ui/react";
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
    <content>
      <Box position="sticky" top="0" bg="white" zIndex={1}>
        <Text fontWeight="bold" fontSize="xl">
          Selasaan Race RSHS - GH Lembang
        </Text>
        <Box>SEMGN</Box>

        <Box bg="#f7f7f7" w="full" color="#898989" p="5px 10px" fontSize="11px">
          <Flex justifyContent="space-between">
            <Text>Total 220</Text>
            <Text>Last updated on 12:33</Text>
          </Flex>
        </Box>
      </Box>

      <AthleteList athletes={segment.Athletes} />
    </content>
  );
}

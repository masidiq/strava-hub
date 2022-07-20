import {
  Text,
  Heading,
  Box,
  Flex,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import segmentSvc from "../services/segmentService";

import AthleteList from "../components/AthleteList";

export default function Page() {
  const [segment, setSegment] = useState({
    Athletes: [],
  });

  const { toggleColorMode } = useColorMode();

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
    <>
      <Box
        position="sticky"
        top="0"
        zIndex={1}
        bg="var(--chakra-colors-chakra-body-bg);"
      >
        <Box p="10px">
          <Heading fontWeight="semibold" size="md">
            Selasaan Race RSHS - GH Lembang
          </Heading>
          <Box>
            <Text fontSize="sm" color="muted">
              Jarak 50km
            </Text>
            <Button onClick={toggleColorMode} mt={1}>
              Toggle Color Mode
            </Button>
          </Box>
        </Box>

        <Box
          w="full"
          p="5px 10px"
          fontSize="11px"
          colorScheme="teal"
          bgColor="bg.gray"
        >
          <Flex justifyContent="space-between" color="muted">
            <Text>Total 220</Text>
            <Text>Last updated on 12:33</Text>
          </Flex>
        </Box>
      </Box>

      <AthleteList athletes={segment.Athletes} />
    </>
  );
}

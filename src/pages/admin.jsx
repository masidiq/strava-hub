import {
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  FormHelperText,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import adminService from "../services/adminService";
export default function Admin() {
  let [segmentId, setSegmentId] = useState("");
  let [progress, setProgress] = useState({
    id: null,
    percent: 0,
    message: "",
  });

  let progressId = null;
  let [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    const result = await adminService.syncAllTime();
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const callProgress = async () => {
    const result = await adminService.getProgress(progressId);
    setProgress((prevState) => ({
      ...result,
    }));
    if (result.percent < 100) {
      setTimeout(() => callProgress(), 2000);
    }
  };

  function fakeProgres() {
    var result = {
      id: "asd",
      percent: 50,
      message: "TAH",
    };

    setProgress(() => ({
      ...result,
    }));

    console.log("DI CLICK : " + progress.message);
  }

  useEffect(() => {}, []);

  return (
    <>
      <Box mt="20px">
        <FormControl>
          <FormLabel>Segment ID</FormLabel>
          <Input
            type="text"
            value={segmentId}
            onChange={setSegmentId}
            placeholder="Segment ID"
          />
        </FormControl>
        <Flex mt="20px" alignItems="center" justify="space-between">
          <Text>
            Progress : {progress.percent}% - ({progress.message})
          </Text>
          <Button onClick={fakeProgres}>Set Progress 50</Button>
          <Button colorScheme="blue" isLoading={isLoading} onClick={submit}>
            Submit
          </Button>
        </Flex>
      </Box>
    </>
  );
}

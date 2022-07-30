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
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Progress,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import adminService from "../../services/adminService";
import segmentService from "../../services/segmentService";
export default function Segment() {
  const { id } = useParams();
  const [segment, setSegment] = useState({
    name: "",
  });
  const [syncType, setSyncType] = useState("today");
  const [progress, setProgress] = useState({
    id: null,
    percent: 0,
    message: "",
  });

  let progressId = null;
  let [isLoading, setIsLoading] = useState(false);
  const submit = async () => {
    if (syncType == "today") doSyncToday();
    else if (syncType == "profile") doSyncProfile();
    else if (syncType == "age") doSyncAge();
    else if (syncType == "women") doSyncWomen();
    else if (syncType == "alltime") doSyncAlltime();
  };

  const doSyncAlltime = async () => {
    const result = await adminService.syncAllTime(id);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncToday = async () => {
    setIsLoading(true);
    const result = await adminService.syncToday(id);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncProfile = async () => {
    setIsLoading(true);
    const result = await adminService.syncToday(id);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncWomen = async () => {
    setIsLoading(true);
    const result = await adminService.syncWomen(id);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncAge = async () => {
    setIsLoading(true);
    const result = await adminService.syncAge(id);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const callProgress = async () => {
    const result = await adminService.getProgress(progressId);
    setIsLoading(true);
    setProgress((prevState) => ({
      ...result,
    }));
    if (result.percent < 100) {
      setTimeout(() => callProgress(), 2000);
    } else {
      setIsLoading(false);
    }
  };

  const getSegment = async () => {
    const result = await segmentService.get(id);
    setSegment((e) => ({
      ...result,
    }));
  };

  useEffect(() => {
    getSegment();
  }, []);

  return (
    <>
      {" "}
      <PageHeader title={segment.Name} subTitle={segment.Id} />
      <Box p="20px">
        <Stack spacing="20px">
          <Box>
            <RadioGroup onChange={setSyncType} value={syncType}>
              <Stack>
                <Radio value="today">Refresh Leaderboard Today</Radio>
                <Radio value="profile">Get Missing Profile Picture</Radio>
                <Radio value="age">Refresh Class Age</Radio>
                <Radio value="women">Refresh Women Info</Radio>
                <Radio value="alltime">All Time PR</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Button
            colorScheme="blue"
            w="100%"
            mt="20px"
            isLoading={isLoading}
            onClick={submit}
          >
            Sync
          </Button>
          <Box>
            <Progress value={progress.percent} size="xs" colorScheme="teal" />
            <Text>
              {progress.percent}%{" - "}
              {progress.message && (
                <Text as="span" fontSize="xs" color="muted">
                  {progress.message}
                </Text>
              )}
            </Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

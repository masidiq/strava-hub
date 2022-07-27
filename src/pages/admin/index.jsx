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
import adminService from "../../services/adminService";
export default function Admin() {
  const [syncType, setSyncType] = React.useState("today");
  const [segmentId, setSegmentId] = useState("");
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
    const result = await adminService.syncAllTime(segmentId);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncToday = async () => {
    setIsLoading(true);
    const result = await adminService.syncToday(segmentId);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncProfile = async () => {
    setIsLoading(true);
    const result = await adminService.syncToday(segmentId);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncWomen = async () => {
    setIsLoading(true);
    const result = await adminService.syncWomen(segmentId);
    progressId = result.id;
    setProgress((prevState) => ({
      ...result,
    }));
    callProgress();
  };

  const doSyncAge = async () => {
    setIsLoading(true);
    const result = await adminService.syncAge(segmentId);
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
  useEffect(() => {}, []);

  return (
    <>
      <Box p="20px">
        <Stack spacing="20px">
          <FormControl>
            <FormLabel>Available Segment</FormLabel>

            <Select
              value={segmentId}
              onChange={(e) => setSegmentId(e.target.value)}
            >
              <option value="30711569">Selasaan Race RSHS - GH Lembang</option>
              <option value="123">GBLA Loop</option>
              <option value="31253449">
                wednesday togetherness KBP loop 5x
              </option>
              <option value="123">Salasa Kahiji</option>
              <option value="other">Lainnya</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Segment ID</FormLabel>
            <Input
              type="text"
              value={segmentId}
              onChange={(e) => setSegmentId(e.target.value)}
              placeholder="Segment ID"
            />
          </FormControl>

          <Box>
            <RadioGroup onChange={setSyncType} value={syncType}>
              <Stack>
                <Radio value="today">Today</Radio>
                <Radio value="profile">Profile</Radio>
                <Radio value="age">Age</Radio>
                <Radio value="women">Women</Radio>
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

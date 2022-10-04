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
  Divider,
  Badge,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/atom/Card";

import PageHeader from "../../../components/PageHeader";

import schedulerService from "../../../services/schedulerService";
import segmentService from "../../../services/segmentService";
export default function SchedulerPage() {
  const [scheduleList, setScheduleList] = useState([]);

  const loadList = async () => {
    const result = await schedulerService.getAll();
    const segmentRawLs = await segmentService.getList(true);
    result.forEach((sch) => {
      sch.Segments.forEach((seg) => {
        var segFound = segmentRawLs.find((o) => o.Id == seg.SegmentId);
        seg.SegmentName = segFound.Name;
      });
    });
    setScheduleList(result);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <>
      <PageHeader title="Scheduler" subTitle="Atur schedule update tiap hari" />
      <Stack mt="20px">
        {scheduleList.map((item, i) => (
          <Box key={i}>
            <Card>
              <Flex
                w="full"
                alignItems="center"
                justifyContent="space-between"
                bgColor="var(--chakra-colors-chakra-body-bg)"
              >
                <Text fontWeight="semibold">{item.DayName}</Text>
                <Button
                  as={Link}
                  to={"/admin/scheduler/" + item.DayName}
                  size="xs"
                  colorScheme="orange"
                >
                  Edit
                </Button>
              </Flex>
              <Divider my="3" />
              <VStack alignItems="flex-start">
                {item.Segments.map((segment, segIdx) => (
                  <HStack>
                    <Text key={segIdx}>{segment.SegmentName}</Text>
                    <Tag ml="auto" size="sm">
                      {segment.UpdateIntervalSpeed}
                    </Tag>
                  </HStack>
                ))}
              </VStack>
            </Card>
          </Box>
        ))}
      </Stack>
    </>
  );
}

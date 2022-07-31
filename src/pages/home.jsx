import {
  Divider,
  Text,
  Box,
  Heading,
  Stack,
  Button,
  useColorMode,
  IconButton,
  Flex,
  useStatStyles,
  VStack,
  StackDivider,
  Icon,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import segmentService from "../services/segmentService";
import moment from "moment";
import Card from "../components/atom/Card";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import SegmentRow from "../components/segment/SegmentRow";
import eqDate from "../helpers/eqDate";
export default function Home() {
  const [feeds, setFeeds] = useState([]);

  const getFeeds = async () => {
    var masterSegments = await segmentService.getList();
    var result = await segmentService.getFeeds();

    result.forEach((feed) => {
      feed.Segments.forEach((seg) => {
        var segDetail = masterSegments.filter((o) => o.Id == seg.SegmentId)[0];
        seg.Name = segDetail.Name;
        seg.Distance = segDetail.Distance;
        seg.ElevDifference = segDetail.ElevDifference;
        seg.Gradient = segDetail.Gradient;
      });
    });

    setFeeds(result);
  };

  useEffect(() => {
    getFeeds();
  }, []);
  return (
    <Stack mt="10px" px="20px" spacing="10px">
      {feeds.map((item, index) => (
        <Box key={item.DateId}>
          <Text fontWeight="semibold">{eqDate.displayDate(item.DateId)}</Text>
          <Card p="0" mt="10px">
            <VStack spacing={0} divider={<Divider />} align="stretch">
              {item.Segments.map((segment, segIdx) => (
                <SegmentRow
                  p="10px 15px"
                  item={segment}
                  key={segment.SegmentId}
                  as={Link}
                  to={"/segment/" + segment.SegmentId + "/" + item.DateId}
                />
              ))}
            </VStack>
          </Card>
        </Box>
      ))}
    </Stack>
  );
}

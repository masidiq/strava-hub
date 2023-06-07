import { Divider, Text, Box, Heading, Stack, Button, useColorMode, IconButton, Flex, useStatStyles, VStack, StackDivider, Icon, Image } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import segmentService from "../services/segmentService";
import moment from "moment";
import Card from "../components/atom/Card";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import SegmentRow from "../components/segment/SegmentRow";
import eqDate from "../helpers/eqDate";
import SegmentRowSkeleton from "../components/segment/SegmentRowSkeleton";
import FeedSkeleton from "./../components/segment/FeedSkeleton";
import Segment1Row from "./../components/segment/Segment1Row";
import staticData from "../helpers/eqStaticData";
export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getFeeds = async () => {
    var masterSegments = await segmentService.getList();
    var result = await segmentService.getFeeds();
    setIsLoading(false);
    result.forEach((feed) => {
      feed.Segments.forEach((seg) => {
        let findSeg = seg.SegmentId;
        if (findSeg === "33091433") {
          findSeg = "33297824";
        }
        var segDetail = masterSegments.find((o) => o.Id == findSeg);

        if (segDetail != null) {
          seg.Name = segDetail.Name;
          seg.Distance = segDetail.Distance;
          seg.ElevDifference = segDetail.ElevDifference;
          seg.Gradient = segDetail.Gradient;
        }
      });
    });

    setFeeds(result);
  };

  useEffect(() => {
    getFeeds();
  }, []);

  function renderLink(segmentId, dateId) {
    var segmentPath = staticData.segmentPaths.find((o) => o.segmentId == segmentId);
    let path = "";
    if (segmentPath) {
      path = "/" + segmentPath.path;
    } else {
      path = "/segment/" + segmentId;
    }

    if (dateId != moment().format("YYYY-MM-DD")) {
      path += "/" + dateId;
    }
    return path;
  }

  return (
    <Box pt={{ base: "10px", md: 0 }} px="20px">
      <Box align="center" mb="25" mt="3">
        <Image src="/salasa-kahiji-logo-landsapce.png" h="100px"></Image>

        <Box color="#1d253b" mt="3" fontWeight="semibold">
          Klasemen Strava
        </Box>
        <Box fontSize="xs" mt="-3px">
          Selasaan Race RSHS - GH Lembang (Masri)
        </Box>
      </Box>

      <Stack spacing="10px">
        {feeds.map((item, index) => (
          <Box key={item.MonthYear}>
            <Text fontWeight="semibold">{item.MonthName}</Text>
            <Card p="0" mt="10px">
              <VStack spacing={0} divider={<Divider />} align="stretch">
                {item.Segments.map((segment, segIdx) => (
                  <Segment1Row p="10px 15px" item={segment} key={segment.SegmentId} as={Link} to={renderLink(segment.SegmentId, segment.Tanggal)} />
                ))}
              </VStack>
            </Card>
          </Box>
        ))}
      </Stack>

      {isLoading && (
        <Stack spacing="10px">
          <FeedSkeleton rows={2} />
          <FeedSkeleton rows={3} />
          <FeedSkeleton rows={1} />
          <FeedSkeleton rows={3} />
          <FeedSkeleton rows={1} />
        </Stack>
      )}
    </Box>
  );
}

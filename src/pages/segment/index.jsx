import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import segmentService from "@/services/segmentService";
import Card from "@/components/atom/Card";
import PageHeader from "@/components/PageHeader";

import SegmentRow from "@/components/segment/SegmentRow";
import SegmentRowSkeleton from "@/components/segment/SegmentRowSkeleton";
import { Link } from "react-router-dom";

export default function SegmentList() {
  const [title, setTitle] = useState("Segment");
  const [segmentList, setSegmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedSegment, setSelectedSegment] = useState(null);

  const [isShowDelete, setIsShowDelete] = useState(false);
  const getList = async () => {
    setIsLoading(true);

    const result = await segmentService.getList(true);
    setIsLoading(false);
    setSegmentList(result);
    setTitle("Daftar Segment (" + result.length + ")");
  };

  useEffect(() => {
    getList(true);
  }, []);

  function showConfirmDeleteSegment(seg) {
    setSelectedSegment(seg);
    setIsShowDelete(true);
  }

  return (
    <>
      <PageHeader title={title} />

      <Stack spacing={0}>
        {segmentList.map((item, i) => (
          <SegmentRow
            p="15px 20px"
            borderBottomWidth={1}
            key={item.Id}
            item={item}
            as={Link}
            to={"/segment/" + item.Id}
          />
        ))}

        {segmentList.length == 0 && (
          <>
            <SegmentRowSkeleton />
            <SegmentRowSkeleton />
            <SegmentRowSkeleton />
            <SegmentRowSkeleton />
            <SegmentRowSkeleton />
          </>
        )}
      </Stack>
      <Box></Box>
    </>
  );
}

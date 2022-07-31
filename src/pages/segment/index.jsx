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
  VStack,
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
    <Box px="20px">
      <PageHeader title={title} />

      <Card p="0" mt="10px">
        <VStack spacing={0} divider={<Divider />} align="stretch">
          {segmentList.map((item, i) => (
            <SegmentRow
              p="10px 15px"
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
            </>
          )}
        </VStack>
      </Card>
      <Button
        w="full"
        colorScheme="blue"
        mt="20px"
        as="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdDBrHNZogYoT7DbASBneAgMA7py1ilapSrPOYQzN3DW5Q1Xg/viewform?usp=sf_link"
      >
        Tambah Segment
      </Button>
      <Button
        w="full"
        variant="outline"
        colorScheme="blue"
        mt="20px"
        as="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdrkwzCu_yhkLFzoSj6-GAO6fujNH7wc-SH7e60Jh-A9eLbcA/viewform?usp=sf_link"
      >
        Kritik & Saran
      </Button>
      <Box></Box>
    </Box>
  );
}

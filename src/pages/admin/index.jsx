import {
  Box,
  Button,
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
import AddSegmentModal from "../../components/AddSegmentModal";
import segmentService from "../../services/segmentService";
import Card from "../../components/atom/Card";
import DialogDeleteSegment from "../../components/dialogs/DialogDeleteSegment";
import PageHeader from "../../components/PageHeader";

import { AiOutlineRise } from "react-icons/ai";
import { TbChartLine } from "react-icons/tb";
import { GiPathDistance } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import CardSegmentRowAdmin from "../../components/CardSegmentRowAdmin";
import CardSegmentRowAdminSkeleton from "../../components/CardSegmentRowAdminSkeleton";
export default function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Flex alignItems="center" justify="space-between">
        <Text>Atur Segment</Text>
        <Button onClick={onOpen} colorScheme="blue" size="sm">
          Tambah
        </Button>
      </Flex>

      <AddSegmentModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        reloadList={getList}
      />

      <DialogDeleteSegment
        isOpen={isShowDelete}
        segment={selectedSegment}
        reloadList={getList}
        onClosed={() => {
          setIsShowDelete(false);
        }}
      />

      <Stack mt="20px">
        {segmentList.map((item, i) => (
          <CardSegmentRowAdmin
            key={item.Id}
            item={item}
            showDelete={showConfirmDeleteSegment}
          />
        ))}

        {segmentList.length == 0 && (
          <>
            <CardSegmentRowAdminSkeleton />
            <CardSegmentRowAdminSkeleton />
            <CardSegmentRowAdminSkeleton />
            <CardSegmentRowAdminSkeleton />
            <CardSegmentRowAdminSkeleton />
          </>
        )}
      </Stack>
      <Box></Box>
    </>
  );
}

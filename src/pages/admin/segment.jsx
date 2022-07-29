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
export default function Segment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("Segment");
  const [segmentList, setSegmentList] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const [selectedSegment, setSelectedSegment] = useState(null);

  const [isShowDelete, setIsShowDelete] = useState(false);
  const getList = async () => {
    setIsLoading(true);

    const result = await segmentService.getList();
    setIsLoading(false);
    setSegmentList(result);
    setTitle("Segment (" + result.length + ")");
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
      <PageHeader
        title={title}
        rightSlot={
          <Button onClick={onOpen} colorScheme="blue" size="sm">
            Tambah
          </Button>
        }
      />

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
          <Card key={i} py="10px">
            <Flex justify="space-between" alignItems="center">
              <Stack>
                <Text noOfLines={1}> {item.Name}</Text>
                <HStack spacing="20px" ml="10px" color="muted">
                  <HStack spacing="5px">
                    <GiPathDistance as={Icon} />
                    <Text fontSize="xs">
                      {item.Distance}
                      {""}
                      <Text fontSize="9px" as="span" color="muted">
                        km
                      </Text>
                    </Text>
                  </HStack>
                  <HStack spacing="3px">
                    <TbChartLine as={Icon} />
                    <Text fontSize="xs">
                      {item.ElevDifference}
                      <Text fontSize="9px" as="span" mr="5px" color="muted">
                        m
                      </Text>
                    </Text>
                  </HStack>
                  <HStack spacing="3px">
                    <AiOutlineRise as={Icon} />
                    <Text fontSize="xs">
                      {item.Gradient}
                      {""}
                      <Text fontSize="9px" as="span" color="muted">
                        %
                      </Text>
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
              <Button
                onClick={() => {
                  showConfirmDeleteSegment(item);
                }}
                size="xs"
                color="red"
              >
                Hapus
              </Button>
            </Flex>
          </Card>
        ))}
      </Stack>
      <Box></Box>
    </>
  );
}

import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Skeleton,
  Stack,
  Divider,
  Table,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import { useLocation } from "react-router-dom";
import Card from "../../../components/atom/Card";
import segmentService from "../../../services/segmentService";
import schedulerService from "../../../services/schedulerService";
import { useToast } from "@chakra-ui/react";

export default function SchedulerDetailPage() {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  let { dayName } = useParams();

  const [segmentList, setSegmentList] = useState([]);
  const loadData = async () => {
    const segmentRawLs = await segmentService.getList(true);
    const schedulerLs = await schedulerService.getAll();

    let schSegments = schedulerLs.find((o) => o.DayName == dayName).Segments;

    let segmentLs = [];
    segmentRawLs.map((segment) => {
      let activeSegment = schSegments.find((o) => o.SegmentId == segment.Id);
      if (activeSegment != null) {
        segment.IsActive = true;
        segment.UpdateIntervalSpeed = activeSegment.UpdateIntervalSpeed;
      } else {
        segment.IsActive = false;
        segment.UpdateIntervalSpeed = "NORMAL";
      }
      segmentLs.push(segment);
    });

    setSegmentList(segmentLs);
  };

  const saveChanges = async () => {
    let param = {
      DayName: dayName,
      Segments: [],
    };

    segmentList.map((o) => {
      if (o.IsActive) {
        let paramSeg = {
          SegmentId: o.Id,
          UpdateIntervalSpeed: o.UpdateIntervalSpeed,
        };
        param.Segments.push(paramSeg);
      }
    });
    await schedulerService.edit(param);
    toast({
      title: "Save Berhasil",
      description: "Jadwal untuk hari " + dayName + " berhasil diupdate",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate(-1);
  };

  function editSegments(id, val, propertyToEdit) {
    var newList = segmentList.map((o) => o);
    var segmentFound = newList.find((o) => o.Id == id);

    segmentFound[propertyToEdit] = val;

    setSegmentList(newList);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageHeader
        title={"Jadwal " + dayName}
        rightSlot={
          <Button colorScheme="orange" px="8" onClick={saveChanges}>
            Save
          </Button>
        }
      />
      <Card px={0}>
        <VStack divider={<Divider />} alignItems="flex-start">
          {segmentList.map((segment, index) => (
            <Flex px="4" w="full" key={index} h="25px">
              <Checkbox
                isChecked={segment.IsActive}
                onChange={(e) =>
                  editSegments(segment.Id, e.target.checked, "IsActive")
                }
              >
                {segment.Name}
              </Checkbox>
              <Spacer />

              {segment.IsActive && (
                <Select
                  w="85px"
                  size="xs"
                  value={segment.UpdateIntervalSpeed}
                  onChange={(e) =>
                    editSegments(
                      segment.Id,
                      e.target.value,
                      "UpdateIntervalSpeed"
                    )
                  }
                >
                  <option value="SLOW">Slow</option>
                  <option value="NORMAL">Normal</option>
                  <option value="FAST">Fast</option>
                  <option value="TURBO">Turbo</option>
                </Select>
              )}
            </Flex>
          ))}
        </VStack>
      </Card>
    </>
  );
}

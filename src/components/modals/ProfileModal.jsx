import { AlertDialog, Box, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, AlertDescription, Button, useDisclosure, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Portal, Avatar, VStack, HStack, SimpleGrid, Badge, Tag, Divider, Icon, Link } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import segmentService from "@/services/segmentService";
import eqDate from "../../helpers/eqDate";

import { BsChevronRight } from "react-icons/bs";

export default function ProfileModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [history, setHistory] = useState({
    Pr: {
      ActivityId: "",
    },
    Items: [],
  });
  let segmentId = "";
  let athleteId = "";

  const getHistory = async () => {
    const result = await segmentService.getHistory(segmentId, athleteId);
    setHistory(result);
  };

  useEffect(() => {
    if (props.isOpen) {
      onOpen();

      athleteId = props.athlete.Id;
      segmentId = props.segmentId;
      if (props.segmentId == "30711569") {
        getHistory();
      }
    }
  }, [props.isOpen]);

  function showAge(cls) {
    switch (cls) {
      case "0_19":
        return "Yunior (Under 19)";
      case "20_24":
        return "Men Elite (20-24)";
      case "25_34":
        return "Master A (25-34)";
      case "35_44":
        return "Master B (35-44)";
      case "45_54":
        return "Master C (45-54)";
      case "55_64":
        return "Master D (55-64)";
      case "65_plus":
        return "Master D+ (65+)";
      case "WOMEN":
        return "Women Open";
    }
  }

  function renderLink(activityId) {
    return "https://www.strava.com/segment_efforts/" + activityId;
  }

  function renderPr(history) {
    let pr = history.Pr.Time;
    let prDate = history.Pr.ActivityDate;
    let activityId = history.Pr.ActivityId;

    return (
      <HStack mt="5px" as={Link} href={renderLink(activityId)} target="_blank">
        <Box textAlign="left" ml="-2px">
          <div className="icon-pr"></div>
        </Box>
        <Text fontSize="xs">{pr}</Text>
        <Text fontSize="xs" color="muted">
          {eqDate.displayFullDate(prDate)}
        </Text>
      </HStack>
    );
  }

  function renderHistoryItem(item) {
    if (item.Time == null) {
      return (
        <HStack fontSize="sm" pl="20px" py="5px">
          <Text mr="auto"> {eqDate.displayShortDate(item.ActivityDate)}</Text>
          <Text width="50px">-</Text>
        </HStack>
      );
    }

    return (
      <HStack fontSize="sm" as={Link} href={renderLink(item.ActivityId)} target="_blank" _hover={{ background: "bg.gray" }} pl="20px" pr="10px" py="5px">
        <Text mr="auto"> {eqDate.displayShortDate(item.ActivityDate)}</Text>
        <Text>{item.Time}</Text>
        <BsChevronRight as={Icon} color="gray" />
      </HStack>
    );
  }

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent>
          {props.athlete && (
            <ModalBody p="0" borderRadius="10px" overflow="hidden">
              <HStack px="20px" py="20px" spacing="20px" bg="#f5f5f5">
                <Avatar size="lg" name={props.athlete.Name} src={props.athlete.ImageUrl} />
                <VStack>
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold" noOfLines="1" as={Link} href={"https://www.strava.com/athletes/" + props.athlete.Id} target="_blank">
                      {props.athlete.Name}
                    </Text>
                    <Text fontSize="xs" mt="-3px">
                      {showAge(props.athlete.Class)} • Rank {props.athlete.RankClass}
                    </Text>

                    {renderPr(history)}
                  </Box>
                </VStack>
              </HStack>

              {history.Items.length > 0 && (
                <>
                  <VStack spacing="0" my="10px">
                    {history.Items.map((item, index) => (
                      <Box key={index} width="100%">
                        {renderHistoryItem(item)}
                      </Box>
                    ))}
                  </VStack>
                </>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Portal>
  );
}

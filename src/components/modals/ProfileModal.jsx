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
      getHistory();
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

  function renderHistoryItem(item) {
    if (item.Time == null) {
      return (
        <HStack fontSize="sm">
          <Text mr="auto"> {eqDate.displayShortDate(item.ActivityDate)}</Text>
          <Text width="40px">-</Text>
        </HStack>
      );
    }

    return (
      <HStack fontSize="sm" as={Link} href={renderLink(item.ActivityId)} target="_blank">
        <Text mr="auto"> {eqDate.displayShortDate(item.ActivityDate)}</Text>
        <Text>{item.Time}</Text>
        <BsChevronRight as={Icon} color="gray" />
      </HStack>
    );
  }

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay bg="blackAlpha.100" backdropFilter="blur(1px)" />
        <ModalContent>
          {props.athlete && (
            <ModalBody p="0">
              <HStack px="10px" py="10px" spacing="15px">
                <Avatar size="lg" name={props.athlete.Name} src={props.athlete.ImageUrl} />
                <VStack>
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold">
                      {props.athlete.Name}
                    </Text>
                    <Text fontSize="sm" mt="-5px">
                      {showAge(props.athlete.Class)} • Rank {props.athlete.RankClass}
                    </Text>

                    <HStack mt="5px" as={Link} href={renderLink(history.Pr.ActivityId)} target="_blank">
                      <Box textAlign="left" ml="-5px">
                        <div className="icon-pr"></div>
                      </Box>
                      <Text fontSize="xs">{history.Pr.Time}</Text>
                      <Text fontSize="xs" color="muted">
                        {eqDate.displayDate(history.Pr.ActivityDate)}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </HStack>
              <Divider my="10px" />

              <VStack pl="15px" pr="10px" py="10px">
                {history.Items.map((item, index) => (
                  <Box key={index} width="100%">
                    {renderHistoryItem(item)}
                  </Box>
                ))}
              </VStack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Portal>
  );
}

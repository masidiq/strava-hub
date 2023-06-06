import { AlertDialog, Box, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, AlertDescription, Button, useDisclosure, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Portal, Avatar, VStack, HStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ProfileModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (props.isOpen) {
      onOpen();
    }
  }, [props.isOpen]);

  function showAge(cls) {
    switch (cls) {
      case "0_19":
        return "U19";

      case "0_24":
        return "U24";

      case "20_24":
        return "20-24";

      case "25_34":
        return "25-34";

      case "35_44":
        return "35-44";

      case "45_54":
        return "45-54";

      case "55_64":
        return "55-64";

      case "55+":
        return "55 ++";

      case "65_69":
        return "65-69 ";

      case "70_74":
        return "70-74";

      case "75_plus":
        return "75++";
    }
  }
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay bg="blackAlpha.100" backdropFilter="blur(5px)" />
        <ModalContent>
          {props.athlete && (
            <ModalBody mb="20px">
              <VStack mt="-58px">
                <Avatar border="5px solid white" size="xl" name={props.athlete.Name} src={props.athlete.ImageUrl} />
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="semibold">
                    {props.athlete.Name}
                  </Text>
                  <Text fontSize="sm">{showAge(props.athlete.Class)}</Text>
                </Box>

                <SimpleGrid columns={2} w="full" spacing="15px" pt="20px">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="orange" rightIcon={<ArrowForwardIcon />} as="a" href={"https://www.strava.com/segment_efforts/" + props.athlete.ActivityId} target="_blank">
                    Strava
                  </Button>
                </SimpleGrid>
              </VStack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Portal>
  );
}

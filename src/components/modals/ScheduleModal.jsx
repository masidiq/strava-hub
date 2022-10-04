import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import adminService from "../services/adminService";
import segmentService from "../services/segmentService";

export default function ScheduleModal(props) {
  const toast = useToast();
  const [model, setModel] = useState({
    DayName: "-",
    DayNumber: 1,
    Segments: [],
  });

  if (props && props.model) {
    setModel(props.model);
  }
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jadwal {model.DayName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt="20px">
              <Box>
                {model.Segments.map((segment, segIdx) => (
                  <Text>{segment.Id}</Text>
                ))}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button w="full" colorScheme="blue" isLoading={isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

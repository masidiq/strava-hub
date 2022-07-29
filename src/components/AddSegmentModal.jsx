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

export default function AddSegmentModal(props) {
  const [segmentId, setSegmentId] = useState("");
  const toast = useToast();

  const [progress, setProgress] = useState({
    id: null,
    percent: 0,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  let progressId = null;
  const submitToServer = async () => {
    setIsLoading(true);

    var isError = false;
    const result = await segmentService.add(segmentId).catch(function (e) {
      setIsLoading(false);

      var prog = {
        percent: 100,
        message: e.message,
      };
      setProgress((prevState) => ({
        ...prog,
      }));

      isError = true;
    });

    progressId = result.id;
    if (isError) {
      return;
    }
    setProgress((prevState) => ({
      ...result,
    }));

    callProgress();
  };

  const callProgress = async () => {
    const result = await adminService.getProgress(progressId);
    setIsLoading(true);
    setProgress((prevState) => ({
      ...result,
    }));
    if (result.percent < 100) {
      setTimeout(() => callProgress(), 2000);
    } else {
      props.reloadList();
      props.onClose();
      setIsLoading(false);

      toast({
        title: "Success",
        description: "Segment berhasil ditambahkan",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Segment Id</FormLabel>
              <Input
                value={segmentId}
                onChange={(e) => {
                  setSegmentId(e.target.value);
                }}
              ></Input>
            </FormControl>

            <Box mt="20px">
              <Progress size="xs" value={progress.percent} w="100%" />

              <Text>
                {progress.percent}%{" - "}
                {progress.message && (
                  <Text as="span" fontSize="xs" color="muted">
                    {progress.message}
                  </Text>
                )}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              w="full"
              colorScheme="blue"
              isLoading={isLoading}
              onClick={submitToServer}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

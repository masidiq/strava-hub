import {
  AlertDialog,
  Box,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDescription,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import segmentService from "../../services/segmentService";

export default function DialogDeleteSegment(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  let segmentName = "";
  const cancelRef = useRef();

  useEffect(() => {
    if (props.isOpen) {
      onOpen();
    }
  }, [props.isOpen]);

  function closeThis() {
    props.onClosed();
    onClose();
  }

  const submitDelete = async () => {
    setIsLoading(true);

    const result = await segmentService.delete(props.segment.Id);
    setIsLoading(false);
    props.reloadList();
    closeThis();
  };

  return (
    <AlertDialog isOpen={isOpen} onOpen={onOpen} onClose={closeThis}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Yakin mau hapus segment?
          </AlertDialogHeader>

          <AlertDialogBody>
            {props.segment && (
              <>
                <Text>{props.segment.Name}</Text>
                <Text fontSize="sm">{props.segment.Id}</Text>
              </>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeThis}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={submitDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import kangPhotoService from "../../services/kangPhotoService";

export default function AddKangPhotoModal(props) {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [link, setLink] = useState("");
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitToServer = async () => {
    setIsLoading(true);

    if (!props.isEdit) {
      await kangPhotoService.add({
        name,
        instagram,
        link,
        index: parseInt(index),
      });
    } else {
      await kangPhotoService.edit({
        id,
        name,
        instagram,
        link,
        index: parseInt(index),
      });
    }

    setIsLoading(false);
    props.reloadList();
    props.onClose();
  };

  useEffect(() => {
    if (props.model) {
      setId(props.model.Id);
      setName(props.model.Name);
      setInstagram(props.model.Instagram);
      setLink(props.model.Link);
      setIndex(props.model.Index);
    }
  }, [props.model]);

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Kang Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>
            </FormControl>

            <FormControl>
              <FormLabel>Link</FormLabel>
              <Input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              ></Input>
            </FormControl>

            <FormControl>
              <FormLabel>Instagram</FormLabel>
              <Input
                value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Index</FormLabel>
              <Input
                value={index}
                type="number"
                onChange={(e) => {
                  setIndex(e.target.value);
                }}
              ></Input>
            </FormControl>
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

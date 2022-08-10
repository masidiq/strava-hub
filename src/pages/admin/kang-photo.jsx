import {
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  FormHelperText,
  Button,
  Flex,
  Text,
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/atom/Card";
import PageHeader from "../../components/PageHeader";
import adminService from "../../services/adminService";
import kangPhotoService from "../../services/kangPhotoService";
import segmentService from "../../services/segmentService";
import AddKangPhotoModal from "../../components/kangPhoto/AddKangPhotoModal";
import DeleteKangPhotoDialog from "./../../components/kangPhoto/DeleteKangPhotoDialog";
import CrudKangPhotoRow from "../../components/kangPhoto/CrudKangPhotoRow";
export default function KangPhoto() {
  const [kangPhotos, setKangPhotos] = useState([]);
  const [kangPhoto, setKangPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  function showDeleteDialog(model) {
    setKangPhoto(model);
    setIsShowDelete(true);
  }

  function showModal(model) {
    setKangPhoto(model);
    setIsEdit(true);
    onOpen();
  }

  const reloadList = async () => {
    setIsLoading(true);
    const result = await kangPhotoService.getList(true);
    setKangPhotos(result);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadList();
  }, []);

  return (
    <>
      <PageHeader
        title="Master Kang Photo"
        rightSlot={
          <Button
            onClick={() => {
              setIsEdit(false);
              onOpen();
            }}
            colorScheme="blue"
            size="sm"
          >
            Tambah
          </Button>
        }
      />

      <DeleteKangPhotoDialog
        isOpen={isShowDelete}
        kangPhoto={kangPhoto}
        reloadList={reloadList}
        onClosed={() => {
          setIsShowDelete(false);
        }}
      />

      <Stack mt="20px">
        {kangPhotos.map((item, i) => (
          <CrudKangPhotoRow
            key={item.Id}
            item={item}
            showDelete={(e) => {
              showDeleteDialog(item);
            }}
            showModal={(e) => {
              showModal(item);
            }}
          />
        ))}

        {kangPhotos.length == 0 && <Text>Empty</Text>}
      </Stack>

      <AddKangPhotoModal
        isOpen={isOpen}
        isEdit={isEdit}
        model={kangPhoto}
        onOpen={onOpen}
        onClose={onClose}
        reloadList={reloadList}
      />
    </>
  );
}

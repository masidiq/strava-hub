import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineRise } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
import { TbChartLine } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function CrudKangPhotoRow(props) {
  let item = {
    Id: "",
    Name: "",
  };

  if (props && props.item) {
    item = props.item;
  }

  return (
    <Box w="full" borderWidth="1px" borderRadius="lg" p="15px">
      <Flex justify="space-between" alignItems="center">
        <Stack>
          <Text noOfLines={1} height="22px">
            {item.Name}
          </Text>
        </Stack>

        <Box textAlign="right">
          <HStack>
            <Button onClick={props.showDelete} size="xs" color="red">
              Hapus
            </Button>
            <Button onClick={props.showModal} size="xs">
              Edit
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

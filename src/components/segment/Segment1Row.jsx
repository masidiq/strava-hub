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
import { FaFlagCheckered } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

export default function Segment1Row(props) {
  let item = {
    Id: "",
    Name: "",
    IsRace: false,
  };

  if (props && props.item) {
    item = props.item;
  }

  return (
    <Box {...props} _hover={{ background: "bg.gray" }}>
      <Flex justify="space-between" alignItems="center">
        <Stack w="full">
          <Text noOfLines={1} height="22px">
            {item.Name}
          </Text>
        </Stack>
        <HStack>
          {item.IsRace && <FaFlagCheckered as={Icon} />}

          <BsChevronRight as={Icon} color="gray" />
        </HStack>
      </Flex>
    </Box>
  );
}

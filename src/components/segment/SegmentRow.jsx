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
import { BsChevronRight } from "react-icons/bs";
export default function SegmentRow(props) {
  let item = {
    Id: "",
    Name: "",
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
          <HStack spacing="20px" ml="10px">
            <HStack spacing="5px">
              <GiPathDistance as={Icon} />
              <Text fontSize="xs">
                {item.Distance}
                {""}
                <Text fontSize="9px" as="span" color="muted">
                  km
                </Text>
              </Text>
            </HStack>
            <HStack spacing="3px">
              <TbChartLine as={Icon} />
              <Text fontSize="xs">
                {item.ElevDifference}
                <Text fontSize="9px" as="span" mr="5px" color="muted">
                  m
                </Text>
              </Text>
            </HStack>
            <HStack spacing="3px">
              <AiOutlineRise as={Icon} />
              <Text fontSize="xs">
                {item.Gradient}
                {""}
                <Text fontSize="9px" as="span" color="muted">
                  %
                </Text>
              </Text>
            </HStack>
          </HStack>
        </Stack>

        <BsChevronRight as={Icon} color="gray" />
      </Flex>
    </Box>
  );
}

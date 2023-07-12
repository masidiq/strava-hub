import { Box, Button, Flex, HStack, Icon, Skeleton, Stack, Tag, Text } from "@chakra-ui/react";
import { AiOutlineRise } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
import { FaFlagCheckered } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import eqDate from "../../helpers/eqDate";

export default function Segment1Row(props) {
  let item = {
    Id: "",
    ShortName: "",
    Name: "",
    AthleteCount: 0,
    IsRace: false,
  };

  if (props && props.item) {
    item = props.item;

    if (item.SegmentId == "34705519") {
      item.ShortName = "SummaLoop";
    }
  }

  return (
    <Box {...props} _hover={{ background: "bg.gray" }}>
      <Flex justify="space-between" alignItems="center">
        <Stack w="full">
          <Text noOfLines={1} height="22px">
            {eqDate.displayFullDate(item.Tanggal)}{" "}
            {!!item.ShortName == true && (
              <Tag size="sm" marginLeft="5px">
                {item.ShortName}
              </Tag>
            )}
          </Text>
        </Stack>
        <HStack>
          {item.AthleteCount > 0 && (
            <Text color="muted" fontSize="xs">
              {item.AthleteCount}
            </Text>
          )}

          <BsChevronRight as={Icon} color="gray" />
        </HStack>
      </Flex>
    </Box>
  );
}

import {
  Box,
  Flex,
  IconButton,
  Heading,
  Button,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

export default function PageHeader(props) {
  const navigate = useNavigate();

  return (
    <Flex
      mb="15px"
      alignItems="center"
      position={{ base: "fixed", md: "initial" }}
      top="0"
      pr={{ base: "10px", md: "0" }}
      zIndex={2}
      background={{
        base: "var(--chakra-colors-chakra-body-bg)",
        md: "bg.base",
      }}
      right="0"
      left="0"
      height={{ base: "60px", md: "auto" }}
      borderBottomWidth={{ base: "1px", md: "0" }}
    >
      {!props.hideBackButton && (
        <IconButton
          variant="ghost"
          size="lg"
          icon={<FiArrowLeft />}
          mr={{ base: "5px", md: "15px" }}
          ml="5px"
          isRound
          onClick={() => {
            navigate(-1);
          }}
        />
      )}

      <Box>
        {!props.title && <Skeleton height="20px" w="200px"></Skeleton>}

        <Heading noOfLines={1} size={{ base: "sm", md: "md" }}>
          {props.title}
        </Heading>

        {props.subTitle}
      </Box>
      <Box ml="auto">{props.rightSlot}</Box>
    </Flex>
  );
}

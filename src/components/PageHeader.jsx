import { Box, Flex, IconButton, Heading, Button } from "@chakra-ui/react";
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
      pr={{ base: "15px", md: "0" }}
      zIndex={2}
      background="var(--chakra-colors-chakra-body-bg)"
      right="0"
      left="0"
      height={{ base: "60px", md: "auto" }}
      borderWidth={{ base: "1px", md: "0" }}
    >
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
      <Box>
        <Heading size={{ base: "sm", md: "md" }}>{props.title}</Heading>
      </Box>
      <Box ml="auto">{props.rightSlot}</Box>
    </Flex>
  );
}

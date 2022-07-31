import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  Td,
  Tr,
} from "@chakra-ui/react";

export default function AthleteRowSkeleton(props) {
  const [wName, setWName] = useState("0%");
  function randomWidth() {
    console.log("ASD");
    return Math.floor(Math.random() * 60 + 30) + "%";
  }

  useEffect(() => {
    setWName(randomWidth);
  }, []);
  return (
    <Tr>
      <Td textAlign="center">
        <Skeleton h="20px" w="20px" />
      </Td>
      <Td p={0}>
        <SkeletonCircle size="32px" />
      </Td>
      <Td pr={0}>
        <Skeleton h="15px" w={wName} />
        <Skeleton h="12px" w="130px" mt="5px" />
      </Td>
      <Td pl="0" pr="5px">
        <Skeleton h="20px" w="60px" float="right" />
      </Td>
      <Td pl="0" textAlign="right">
        <Skeleton h="20px" w="40px" float="right" />
      </Td>
    </Tr>
  );
}

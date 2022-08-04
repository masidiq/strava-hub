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
    return Math.floor(Math.random() * 60 + 30) + "%";
  }

  useEffect(() => {
    setWName(randomWidth);
  }, []);
  return (
    <Tr borderWidth={{ base: "0", md: "1px" }}>
      <Td textAlign="center" px="3px" w="33px">
        <Flex justify="center">
          <Skeleton h="15px" w="15px" />
        </Flex>
      </Td>
      <Td p={0} w="35px">
        <SkeletonCircle size="32px" />
      </Td>
      <Td pr={0} pl="10px">
        <Skeleton h="15px" w={wName} />
        <Skeleton h="12px" w="130px" mt="5px" />
      </Td>
      <Td pl="0" pr="5px" w="70px">
        <Skeleton h="20px" w="50px" float="right" />
      </Td>
      <Td pl="0" pr="5px" textAlign="right">
        <Skeleton h="20px" w="40px" float="right" />
      </Td>
    </Tr>
  );
}

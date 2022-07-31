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
  function randomWidth() {
    console.log("ASD");
    return Math.floor(Math.random() * 60 + 30) + "%";
  }
  return (
    <Tr>
      <Td textAlign="center">
        <Skeleton h="20px" w="20px" />
      </Td>
      <Td p={0}>
        <SkeletonCircle size="8" />
      </Td>
      <Td pr={0}>
        <Skeleton h="15px" w="190px" />
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

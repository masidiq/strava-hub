import { Box, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";

export default function SegmentRowSkeleton(props) {
  function randomWidth() {
    return Math.floor(Math.random() * 50 + 30) + "%";
  }
  return (
    <Box p="15px">
      <Flex justify="space-between" alignItems="center">
        <Stack w="full">
          <Skeleton height="20px" w={randomWidth} />

          <HStack spacing="20px" ml="10px">
            <Skeleton height="20px" w="40px" />
            <Skeleton height="20px" w="40px" />
            <Skeleton height="20px" w="40px" />
          </HStack>
        </Stack>
        <Skeleton height="20px" w="20px" number={3} />
      </Flex>
    </Box>
  );
}

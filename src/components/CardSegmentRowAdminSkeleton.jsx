import { Box, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";

export default function CardSegmentRowAdminSkeleton(props) {
  function randomWidth() {
    return Math.floor(Math.random() * 40 + 30) + "%";
  }
  return (
    <Box w="full" borderWidth="1px" borderRadius="lg" p="15px">
      <Flex justify="space-between" alignItems="center">
        <Stack w="full">
          <Skeleton height="20px" w={randomWidth} />

          <HStack spacing="20px" ml="10px">
            <Skeleton height="20px" w="40px" />
            <Skeleton height="20px" w="40px" />
            <Skeleton height="20px" w="40px" />
          </HStack>
        </Stack>

        <Box w="50px" textAlign="right">
          <Skeleton height="20px" />
        </Box>
      </Flex>
    </Box>
  );
}

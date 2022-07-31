import {
  Box,
  Divider,
  Flex,
  HStack,
  Skeleton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Card from "../atom/Card";
import SegmentRowSkeleton from "./SegmentRowSkeleton";

export default function FeedSkeleton(props) {
  function randomWidth() {
    return Math.floor(Math.random() * 50 + 30) + "%";
  }
  return (
    <Box>
      <Skeleton h="20px" w="150px" />
      <Card p="0" mt="10px">
        <VStack spacing={0} divider={<Divider />} align="stretch">
          {Array.from(Array(props.rows), (e, i) => {
            return <SegmentRowSkeleton key={i} />;
          })}
        </VStack>
      </Card>
    </Box>
  );
}

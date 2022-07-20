import {
  Text,
  Flex,
  Box,
  Heading,
  Button,
  useColorMode,
} from "@chakra-ui/react";

export default function SegmentHeader(props) {
  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex={1}
        bg="var(--chakra-colors-chakra-body-bg);"
      >
        <Box p="10px">
          <Heading fontWeight="semibold" size="md">
            Selasaan Race RSHS - GH Lembang
          </Heading>
          <Box>
            <Text fontSize="sm" color="muted">
              Jarak 50km
            </Text>
          </Box>
        </Box>

        <Box w="full" p="5px 10px" fontSize="11px" bgColor="bg.gray">
          <Flex justifyContent="space-between" color="muted">
            <Text>Total 220</Text>
            <Text>Last updated on 12:33</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

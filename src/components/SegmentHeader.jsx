import {
  Text,
  Flex,
  Box,
  Heading,
  Button,
  Select,
  useColorMode,
  HStack,
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
            {props.name}
          </Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Select>
                <option value="option1">ALL Time</option>
                <option value="option1">Rabu, 12 Des</option>
                <option value="option2">Kamis, 13 Des</option>
                <option value="option3">Selasa, 14 Des</option>
              </Select>
            </Box>
            <Box>
              <HStack spacing="24px">
                <Box>
                  <Text fontSize="sm" color="muted">
                    Jarak
                  </Text>
                  <Text fontSize="sm" color="muted">
                    {props.distance} km
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="muted">
                    Elevasi
                  </Text>
                  <Text fontSize="sm" color="muted">
                    {props.elevation} m
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="muted">
                    Gradien
                  </Text>
                  <Text fontSize="sm" color="muted">
                    {props.gradient}
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Flex>
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

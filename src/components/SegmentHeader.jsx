import {
  Text,
  Flex,
  Box,
  Heading,
  Button,
  Select,
  useColorMode,
  HStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
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
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontWeight="semibold" size="md" mb="10px" noOfLines={1}>
              {props.name}
            </Heading>
            <Button
              size="xs"
              as="a"
              target="_blank"
              href={"https://www.strava.com/segments/30711569"}
              rightIcon={<ArrowForwardIcon />}
            >
              Strava
            </Button>
          </Flex>
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
              <HStack spacing="10px" textAlign="right" ml="10px">
                <Box>
                  <Text fontSize="xs" color="muted">
                    Jarak
                  </Text>
                  <Text>
                    {props.distance}
                    <Text as="span" fontSize="xs" color="muted">
                      km
                    </Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="muted">
                    Elevasi
                  </Text>
                  <Text>
                    {props.elevation}
                    <Text as="span" fontSize="xs" color="muted">
                      m
                    </Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="muted">
                    Gradien
                  </Text>

                  <Text>
                    {props.gradient}
                    <Text as="span" fontSize="xs" color="muted">
                      %
                    </Text>
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

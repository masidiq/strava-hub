import {
  Divider,
  Text,
  Box,
  Heading,
  Stack,
  Button,
  useColorMode,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { MoonIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
export default function Home() {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <section>
        <Flex justifyContent="space-between" alignItems="center">
          <Box p="10px">
            <Text fontSize="3xl" fontWeight="semibold">
              GOWW
            </Text>
            <Text fontSize="sm" color="muted" marginTop={-1}>
              Strava leaderboard
            </Text>
          </Box>
          <IconButton
            icon={<MoonIcon />}
            onClick={toggleColorMode}
            isRound={true}
          />
        </Flex>

        <Stack direction="row" spacing={4} align="center" mt="5">
          <Button colorScheme="teal" variant="outline" w="full">
            Kang Photo
          </Button>
          <Button colorScheme="teal" variant="outline" w="full">
            Segments
          </Button>
          <Button colorScheme="teal" variant="outline" w="full">
            Request Segment
          </Button>
        </Stack>

        <Box p={5} my={5} borderWidth="1px" shadow="xl" borderRadius="lg">
          <Heading fontSize="xl">TItle</Heading>
          <Text mt={4}>
            When navigating between pages, we want to persist page state (input
            values, scroll position, etc.) for a Single-Page Application (SPA)
            experience.
          </Text>
          <p>
            To visualize this, try tying in the search input in the{" "}
            <code>Sidebar</code> and then changing routes. You'll notice the
            input state is persisted.
          </p>
        </Box>
        <p></p>
        <p>
          This layout pattern will allow for state persistence because the React
          component tree is persisted between page transitions. To preserve
          state, we need to prevent the React component tree from being
          discarded between page transitions.
        </p>
        <h3>Try It Out</h3>
      </section>
      <Navbar />
    </>
  );
}

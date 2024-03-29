import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  Image,
  useDisclosure,
  Button,
  Hide,
  HStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      shadow={{ md: "md" }}
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      bgColor="var(--chakra-colors-chakra-body-bg)"
      zIndex={2}
      w="full"
    >
      <Container maxW="xl">
        <Flex py="6px" alignItems="center" h={{ base: "59px", md: "auto" }}>
          <Box as={Link} to="/">
            <Flex alignItems="center">
              <Text fontWeight="semibold" fontSize="xl">
                <Text as="span" fontWeight="extrabold">
                  GOWW
                </Text>
              </Text>
            </Flex>
          </Box>

          {/* RIGHT */}
          <HStack ml="auto" alignItems="center">
            <Button variant="ghost" fontWeight="light" as={Link} to="/segment">
              Daftar Segment
            </Button>{" "}
            <IconButton
              size="sm"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              isRound={true}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

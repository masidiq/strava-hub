import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { MdHome, MdOutlinePhotoLibrary } from "react-icons/md";
MdOutlinePhotoLibrary;
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
import { original } from "@reduxjs/toolkit";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      bgColor="var(--chakra-colors-chakra-body-bg)"
      shadow={{ md: "md" }}
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      zIndex={1}
      w="full"
    >
      <Container maxW="xl">
        <Flex py="6px" alignItems="center" h="60px">
          <Box as={Link} to="/admin">
            <Flex alignItems="center">
              <Text fontWeight="semibold" fontSize="xl">
                <Text as="span" fontWeight="extrabold" color="orange">
                  Admin-Page
                </Text>
              </Text>
            </Flex>
          </Box>

          {/* RIGHT */}
          <HStack ml="auto" alignItems="center">
            <Button
              as={Link}
              to="/admin/kang-photo"
              size="sm"
              icon={<MdOutlinePhotoLibrary />}
            >
              Kang Photo
            </Button>
            <Button
              as={Link}
              to="/admin/scheduler"
              size="sm"
              icon={<MdOutlinePhotoLibrary />}
            >
              Scheduler
            </Button>
            <IconButton
              as={Link}
              to="/"
              size="sm"
              icon={<MdHome />}
              isRound={true}
            ></IconButton>
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

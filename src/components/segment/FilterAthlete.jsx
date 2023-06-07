import { Box, Text, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, SimpleGrid, useDisclosure, Wrap, DrawerCloseButton, DrawerFooter, Checkbox, Icon, HStack, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

import { doFilter } from "../../redux/athleteStore";
import { useSelector, useDispatch } from "react-redux";
import { IoFastFood, IoFilterOutline } from "react-icons/io5";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
export default function FilterAthlete(props) {
  const [isDesktopView] = useMediaQuery("(min-width: 590px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const availableFilters = useSelector((state) => state.athlete.availableFilters);

  const filter = useSelector((state) => state.athlete.filter);

  let placementFilter = "bottom";
  if (isDesktopView) {
    placementFilter = "left";
  }

  useEffect(() => {
    if (props.openCount > 0) {
      onOpen();
    }
  }, [props.openCount]);

  return (
    <Drawer placement={placementFilter} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems="center">
            <IoFilterOutline />
            <Text ml="10px">Filter</Text>
          </Flex>
          <DrawerCloseButton mt="8px" />
        </DrawerHeader>
        <DrawerBody>
          <SimpleGrid spacing={2} columns={1}>
            {availableFilters.map((item, i) => (
              <Button variant="outline" colorScheme="teal" key={i} onClick={(e) => dispatch(doFilter(item.code))}>
                <Flex alignItems="center" w="full">
                  {item.isActive ? <ImCheckboxChecked as={Icon} /> : <ImCheckboxUnchecked as={Icon} />}

                  <Text ml="10px">{item.name}</Text>
                  <Text color="muted" fontWeight="thin" ml="auto">
                    {item.total}
                  </Text>
                </Flex>
              </Button>
            ))}
          </SimpleGrid>
        </DrawerBody>
        <DrawerFooter>
          <Button w="full" colorScheme="teal" onClick={onClose}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

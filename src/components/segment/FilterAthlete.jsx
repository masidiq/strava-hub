import {
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  SimpleGrid,
  useDisclosure,
  Wrap,
  DrawerCloseButton,
  DrawerFooter,
  Checkbox,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { doFilter } from "../../redux/athleteStore";
import { useSelector, useDispatch } from "react-redux";
import { IoFilterOutline } from "react-icons/io5";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
export default function FilterAthlete(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const availableFilters = useSelector(
    (state) => state.athlete.availableFilters
  );

  const filter = useSelector((state) => state.athlete.filter);

  useEffect(() => {
    if (props.openCount > 0) {
      onOpen();
    }
  }, [props.openCount]);

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
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
          <Text fontWeight="semibold" mb="5px">
            Gender
          </Text>
          <SimpleGrid spacing={2} columns={2}>
            <Button
              variant="outline"
              colorScheme="blue"
              isActive={filter.isMan.isActive}
              onClick={(e) => dispatch(doFilter("man"))}
            >
              <Flex alignItems="center" w="full">
                {filter.isMan.isActive ? (
                  <ImCheckboxChecked as={Icon} />
                ) : (
                  <ImCheckboxUnchecked as={Icon} />
                )}

                <Text ml="10px">Pria</Text>
                <Text color="muted" fontWeight="thin" ml="auto">
                  {filter.isMan.total}
                </Text>
              </Flex>
            </Button>

            <Button
              variant="outline"
              colorScheme="blue"
              isActive={filter.isWomen.isActive}
              onClick={(e) => dispatch(doFilter("women"))}
            >
              <Flex alignItems="center" w="full">
                {filter.isWomen.isActive ? (
                  <ImCheckboxChecked as={Icon} />
                ) : (
                  <ImCheckboxUnchecked as={Icon} />
                )}

                <Text ml="10px">Wanita</Text>
                <Text color="muted" fontWeight="thin" ml="auto">
                  {filter.isWomen.total}
                </Text>
              </Flex>
            </Button>
          </SimpleGrid>
          <Text fontWeight="semibold" mb="5px" mt="20px">
            Umur
          </Text>
          <SimpleGrid spacing={2} columns={1}>
            {availableFilters.map((item, i) => (
              <Button
                variant="outline"
                colorScheme="blue"
                key={i}
                onClick={(e) => dispatch(doFilter(item.code))}
                isActive={item.isActive}
              >
                <Flex alignItems="center" w="full">
                  {item.isActive ? (
                    <ImCheckboxChecked as={Icon} />
                  ) : (
                    <ImCheckboxUnchecked as={Icon} />
                  )}

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
          <Button w="full" colorScheme="blue" onClick={onClose}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

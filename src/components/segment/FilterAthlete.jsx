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
} from "@chakra-ui/react";
import { useEffect } from "react";

import { doFilter } from "../../redux/athleteStore";
import { useSelector, useDispatch } from "react-redux";

export default function FilterAthlete(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const availableFilters = useSelector(
    (state) => state.athlete.availableFilters
  );

  useEffect(() => {
    if (props.openCount > 0) {
      onOpen();
    }
  }, [props.openCount]);

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
        <DrawerBody>
          <SimpleGrid spacing={2} columns={2}>
            {availableFilters.map((item, i) => (
              <Button
                variant="outline"
                key={i}
                onClick={(e) => dispatch(doFilter(item.code))}
                isActive={item.isActive}
              >
                <Flex justifyContent="space-between" w="full">
                  <Text>{item.name}</Text>
                  <Text color="muted">{item.total}</Text>
                </Flex>
              </Button>
            ))}
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

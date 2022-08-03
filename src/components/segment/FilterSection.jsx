import {
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import FilterAthlete from "@/components/segment/FilterAthlete";
import { IoFilterOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { doFilter } from "@/redux/athleteStore";

export default function FilterSection() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [openCount, doOpen] = useState(0);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.athlete.availableFilters);
  const genderFilter = useSelector((state) => state.athlete.filter);

  return (
    <>
      <FilterAthlete openCount={openCount} />
      <Flex
        p="10px"
        px={{ base: "10px", md: 0 }}
        justify="space-between"
        alignItems="center"
        position="sticky"
        top={{ base: "60px", md: "50px" }}
        background={{
          base: "var(--chakra-colors-chakra-body-bg)",
          md: "bg.base",
        }}
        zIndex="1"
      >
        <Box></Box>
        {pageLoaded && filters.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              flex="0 0 auto"
              mr="5px"
              onClick={() => doOpen((prev) => prev + 1)}
              leftIcon={<IoFilterOutline />}
            >
              Filter
            </Button>
            <HStack
              overflow="auto"
              w="full"
              alignItems="center"
              pb="2px"
              mt="2px"
            >
              {genderFilter.isWomen.isActive && (
                <Tag
                  size="sm"
                  borderRadius="full"
                  variant="outline"
                  colorScheme="blue"
                  flex="0 0 auto"
                >
                  <TagLabel>Wanita</TagLabel>
                  <TagCloseButton
                    ml="0"
                    onClick={(e) => dispatch(doFilter("women"))}
                  />
                </Tag>
              )}

              {genderFilter.isMan.isActive && (
                <Tag
                  size="sm"
                  borderRadius="full"
                  variant="outline"
                  colorScheme="blue"
                  flex="0 0 auto"
                >
                  <TagLabel>Pria</TagLabel>
                  <TagCloseButton
                    ml="0"
                    onClick={(e) => dispatch(doFilter("man"))}
                  />
                </Tag>
              )}
              {filters.map(
                (item, i) =>
                  item.isActive && (
                    <Tag
                      size="sm"
                      borderRadius="full"
                      variant="outline"
                      colorScheme="blue"
                      key={i}
                      flex="0 0 auto"
                    >
                      <TagLabel> {item.shortName}</TagLabel>
                      <TagCloseButton
                        ml="0"
                        onClick={(e) => dispatch(doFilter(item.code))}
                      />
                    </Tag>
                  )
              )}
            </HStack>
          </>
        )}
        {filters.filter((o) => o.isActive).length < 4 && (
          <HStack spacing="25px" textAlign="right">
            <Box>
              <Skeleton isLoaded={segmentDetail.Name != null} minW="50px">
                <Text color="muted" fontSize="xs">
                  Jarak
                </Text>

                <Text fontSize="sm">{segmentDetail.Distance}km</Text>
              </Skeleton>
            </Box>
            <Skeleton isLoaded={segmentDetail.Name != null} minW="50px">
              <Box>
                <Text color="muted" fontSize="xs">
                  Elevasi
                </Text>
                <Text fontSize="sm">{segmentDetail.ElevGain}m</Text>
              </Box>
            </Skeleton>
            <Skeleton isLoaded={segmentDetail.Name != null} minW="50px">
              <Box>
                <Text color="muted" fontSize="xs">
                  Gradien
                </Text>
                <Text fontSize="sm">{segmentDetail.Gradient}%</Text>
              </Box>
            </Skeleton>
          </HStack>
        )}
      </Flex>
    </>
  );
}

import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Skeleton,
  Stack,
  Table,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AthleteList from "../../components/AthleteList";
import PageHeader from "../../components/PageHeader";
import segmentService from "../../services/segmentService";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import moment from "moment";
import AthleteRowSkeleton from "../../components/segment/AthleteRowSkeleton";
import eqDate from "../../helpers/eqDate";
import FilterAthlete from "../../components/segment/FilterAthlete";
import { IoFilterOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { set, doFilter } from "../../redux/athleteStore";

export default function _id() {
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [segmentDetail, segSegmentDetail] = useState({
    Name: null,
  });
  const [listDate, setListDate] = useState([]);
  let { id, date } = useParams();
  const [selectedDate, setSelectedDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openCount, doOpen] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const athleteList = useSelector((state) => state.athlete.filteredList);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.athlete.availableFilters);
  const genderFilter = useSelector((state) => state.athlete.filter);
  const getData = async () => {
    console.log("Load Data");
    setIsLoading(true);
    var segResult = await segmentService.get(id);
    segSegmentDetail(segResult);

    var result = await segmentService.getListDate(id);
    setListDate(result);

    if (!date) {
      date = result[0];
    }
    setSelectedDate(date);

    var segmentResult = await segmentService.getLeaderboard(id, date);

    dispatch(set(segmentResult.Athletes));

    setLastUpdate(segmentResult.LastUpdated);
    setIsLoading(false);
    setPageLoaded(true);
  };

  useEffect(() => {
    getData();
  }, [date]);

  function goTo(dateId) {
    window.history.replaceState(null, "", "/segment/" + id + "/" + dateId);
    date = dateId;
    getData();
  }
  return (
    <>
      <PageHeader
        title={segmentDetail.Name}
        subTitle={
          <Box>
            <Skeleton
              isLoaded={listDate.length > 0}
              minW="50px"
              maxW="150px"
              mt="2px"
            >
              <Select
                size="xs"
                minW="120px"
                w="fit-content"
                value={selectedDate}
                onChange={(e) => {
                  goTo(e.target.value);
                }}
              >
                {listDate.map((item, i) => (
                  <option key={i} value={item}>
                    {eqDate.displayDate(item)}
                  </option>
                ))}
              </Select>
            </Skeleton>
          </Box>
        }
        rightSlot={
          <Button
            size="xs"
            as="a"
            target="_blank"
            href={"https://www.strava.com/segments/" + segmentDetail.Id}
            rightIcon={<ArrowForwardIcon />}
          >
            strava
          </Button>
        }
      />

      <FilterAthlete openCount={openCount} />
      <Flex
        p="10px"
        px={{ base: "10px", md: 0 }}
        justify="space-between"
        alignItems="center"
      >
        <Box></Box>
        {pageLoaded && filters.length > 1 && (
          <>
            <Button
              variant="outline"
              size="xs"
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
                <Text fontSize="xs">Jarak</Text>

                <Text>{segmentDetail.Distance}km</Text>
              </Skeleton>
            </Box>
            <Skeleton isLoaded={segmentDetail.Name != null} minW="50px">
              <Box>
                <Text fontSize="xs">Elevasi</Text>
                <Text>{segmentDetail.ElevGain}m</Text>
              </Box>
            </Skeleton>
            <Skeleton isLoaded={segmentDetail.Name != null} minW="50px">
              <Box>
                <Text fontSize="xs">Gradien</Text>
                <Text>{segmentDetail.Gradient}%</Text>
              </Box>
            </Skeleton>
          </HStack>
        )}
      </Flex>

      <Table size="sm" colorScheme="teal">
        <Thead background="bg.gray">
          <Tr>
            <Th textAlign="left" pl="3px" colSpan={2}>
              Rank
            </Th>

            <Th pl="10px">Athlete</Th>
            <Th w="75px" textAlign="right" pr="15px" pl={0}>
              Speed
            </Th>
            <Th w="61px" pr="5px" textAlign="right">
              Time
            </Th>
          </Tr>
        </Thead>
        {isLoading && (
          <Tbody>
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
            <AthleteRowSkeleton />
          </Tbody>
        )}

        {athleteList.length > 0 && !isLoading && (
          <AthleteList athletes={athleteList} />
        )}
      </Table>

      <Flex
        position="fixed"
        w="xl"
        maxW="full"
        bottom={0}
        bg="bg.gray"
        alignItems="center"
        py="5px"
        px="10px"
        fontSize="10px"
        justify="space-between"
        color="muted"
      >
        <Text>Total {athleteList.length}</Text>
        <Text>Last Update {eqDate.displayTime(lastUpdate)}</Text>
      </Flex>
    </>
  );
}

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

import { useSelector, useDispatch } from "react-redux";
import { set, doFilter } from "../../redux/athleteStore";

export default function _id() {
  const navigate = useNavigate();

  const [segment, setSegment] = useState(null);
  const [segmentDetail, segSegmentDetail] = useState({
    Name: null,
  });
  const [listDate, setListDate] = useState([]);
  let { id, date } = useParams();
  const [selectedDate, setSelectedDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openCount, doOpen] = useState(0);

  const athleteList = useSelector((state) => state.athlete.filteredList);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.athlete.availableFilters);
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
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [date]);

  function goTo(dateId) {
    navigate("/segment/" + id + "/" + dateId);
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
        <Button
          variant="outline"
          size="sm"
          flex="0 0 auto"
          mr="5px"
          onClick={() => doOpen((prev) => prev + 1)}
        >
          Filter
        </Button>

        <HStack overflow="auto" w="full" alignItems="center">
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
      </Flex>

      <Table size="sm" colorScheme="teal">
        <Thead background="bg.gray">
          <Tr>
            <Th w="30px" textAlign="center" p={0}>
              Rank
            </Th>
            <Th w="35px"></Th>
            <Th>Athlete</Th>
            <Th w="75px" textAlign="right" pr="25px" pl={0}>
              Speed
            </Th>
            <Th w="100px" pr="18px" textAlign="right">
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
    </>
  );
}

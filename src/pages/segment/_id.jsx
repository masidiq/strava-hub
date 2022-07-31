import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AthleteList from "../../components/AthleteList";
import PageHeader from "../../components/PageHeader";
import segmentService from "../../services/segmentService";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import moment from "moment";
export default function _id() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState(null);
  const [segmentDetail, segSegmentDetail] = useState({
    Name: null,
  });
  const [listDate, setListDate] = useState([]);
  let { id, date } = useParams();
  const [selectedDate, setSelectedDate] = useState();

  const getData = async () => {
    console.log("Load Data");
    var segResult = await segmentService.get(id);
    segSegmentDetail(segResult);

    var result = await segmentService.getListDate(id);
    setListDate(result);

    if (!date) {
      date = moment().format("YYYY-MM-DD");
    }

    setSelectedDate(date);

    var segmentResult = await segmentService.getLeaderboard(id, date);

    setSegment(segmentResult);
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
            <Select
              size="xs"
              minW="90px"
              w="fit-content"
              value={selectedDate}
              onChange={(e) => {
                goTo(e.target.value);
              }}
            >
              {listDate.map((item, i) => (
                <option key={i} value={item.DateId}>
                  {item.Title}
                </option>
              ))}
            </Select>
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

      <Flex p="10px 20px" justify="space-between" alignItems="center">
        <HStack spacing="40px">
          <Box>
            <Text fontSize="xs">Jarak</Text>
            <Text>{segmentDetail.Distance}km</Text>
          </Box>
          <Box>
            <Text fontSize="xs">Elevasi</Text>
            <Text>{segmentDetail.ElevGain}m</Text>
          </Box>
          <Box>
            <Text fontSize="xs">Gradien</Text>
            <Text>{segmentDetail.Gradient}%</Text>
          </Box>
        </HStack>
      </Flex>
      {segment && <AthleteList athletes={segment.Athletes} />}
    </>
  );
}

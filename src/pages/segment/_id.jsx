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
export default function _id() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState(null);
  const [segmentDetail, segSegmentDetail] = useState({
    Name: null,
  });
  const [listDate, setListDate] = useState([]);
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState();

  const getData = async () => {
    var segResult = await segmentService.get(id);
    segSegmentDetail(segResult);

    var result = await segmentService.getListDate(id);
    setListDate(result);

    var segmentResult = await segmentService.getLeaderboard(
      id,
      result[0].DateId
    );

    setSegment(segmentResult);
  };
  useEffect(() => {
    getData();
  }, []);

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
        <Box textAlign="right">
          <Text fontSize="12px">{segmentDetail.TotalAttempt} percobaan</Text>
          <Text fontSize="12px"> oleh {segmentDetail.TotalPeople} orang</Text>
        </Box>
      </Flex>
      {segment && <AthleteList athletes={segment.Athletes} />}
    </>
  );
}

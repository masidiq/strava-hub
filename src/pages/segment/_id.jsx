import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AthleteList from "../../components/AthleteList";
import PageHeader from "../../components/PageHeader";
import segmentService from "../../services/segmentService";

export default function _id() {
  const [segment, setSegment] = useState(null);
  const [segmentDetail, segSegmentDetail] = useState({
    Name: null,
  });
  const [listDate, setListDate] = useState([]);
  const { id } = useParams();

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
  return (
    <>
      <PageHeader
        title={segmentDetail.Name}
        rightSlot={
          <Button
            size="xs"
            as="a"
            target="_blank"
            href={"https://www.strava.com/segments/" + segmentDetail.Id}
          >
            strava
          </Button>
        }
      />
      {segment && <AthleteList athletes={segment.Athletes} />}
    </>
  );
}

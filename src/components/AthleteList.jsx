import { Avatar, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import moment from "moment";
import { Text, Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import AthleteRowSkeleton from "./segment/AthleteRowSkeleton";
import ProfileModal from "./modals/ProfileModal";
import { useState } from "react";

export default function AthleteList(props) {
  function relativeDateView(date) {
    if (!date) {
      return "-";
    }

    var dateMoment = moment(date, "YYYY-MM-DD");

    // kalo hari ini
    if (date == moment().format("YYYY-MM-DD")) {
      return "Hari ini";
    }
    date += " 23:59";

    // klo lebih dari setaun lengkap aja
    if (moment().diff(dateMoment, "days") > 320) {
      return moment(date, "YYYY-MM-DD HH:mm").format("D MMM YYYY");
    }

    // klo kurang dari 24 jam
    if (moment().diff(dateMoment, "days") == 1) {
      return "Kemarin";
    }
    return moment(date, "YYYY-MM-DD HH:mm").fromNow();
  }

  const [openProfileCount, doOpenProfile] = useState(0);
  const [athlete, setAthlete] = useState(null);

  function openProfileModal(athlete) {
    setAthlete(athlete);
    doOpenProfile((prev) => prev + 1);
  }
  return (
    <Tbody>
      <Tr>
        <Td display="none">
          <ProfileModal isOpen={openProfileCount} athlete={athlete} />
        </Td>
      </Tr>
      {props.athletes.map((athlete, index) => (
        <Tr key={index} bg="bg.default" borderWidth={{ base: "0", md: "1px" }} onClick={() => openProfileModal(athlete)} cursor="pointer" _hover={{ background: "bg.gray" }}>
          <Td textAlign="center" pl="3px" pr="5px" w="33px">
            <Text fontSize="xs">{index + 1}</Text>
          </Td>
          <Td w="35px" p={0}>
            <Avatar size="sm" name={athlete.Name} src={athlete.ImageUrl} />
          </Td>
          <Td pr={0} pl="10px">
            <div>
              <div>
                <Text noOfLines={1} fontSize="sm">
                  {athlete.Name}
                </Text>

                {athlete.Pr && (
                  <div>
                    <Text noOfLines={1} color="muted" fontSize="xs">
                      {athlete.Pr} <span> • </span>
                      {relativeDateView(athlete.PrDate)}
                    </Text>
                  </div>
                )}

                {!athlete.Pr && (
                  <div>
                    <Text noOfLines={1} color="muted" fontSize="xs">
                      -
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </Td>
          <Td pl="0" pr="5px">
            <Text textAlign="right" noOfLines={1} fontSize="xs">
              {athlete.Speed}{" "}
              <Text as="span" color="muted" fontSize="10px" letterSpacing="0px">
                km/h
              </Text>
            </Text>
          </Td>
          <Td pl={0} pr="5px">
            <Flex alignItems="center" justifyContent="flex-end">
              {athlete.IsNewPr == true && (
                <Box mr="3px" textAlign="left">
                  <div className="icon-pr"></div>
                </Box>
              )}
              <Box>
                <Text textAlign="right" noOfLines={1} fontSize={athlete.Time.length < 6 ? "xs" : "11px"}>
                  {athlete.Time}
                </Text>
              </Box>
            </Flex>
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}

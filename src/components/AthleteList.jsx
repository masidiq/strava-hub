import { Avatar, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import moment from "moment";
import {
  Text,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import AthleteRowSkeleton from "./segment/AthleteRowSkeleton";

export default function AthleteList(props) {
  function relativeDateView(date) {
    if (!date) {
      return "-";
    }
    let time = moment().format("HH:mm");
    date += " " + time;
    return moment(date, "YYYY-MM-DD HH:mm").fromNow();
  }

  return (
    <Tbody>
      {props.athletes.map((athlete, index) => (
        <Tr key={index}>
          <Td textAlign="center">
            <Text fontSize="sm">{index + 1}</Text>
          </Td>
          <Td p={0}>
            <Avatar size="sm" name={athlete.Name} src={athlete.ImageUrl} />
          </Td>
          <Td pr={0}>
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
            <Text textAlign="right" noOfLines={1} fontSize="sm">
              {athlete.Speed}{" "}
              <Text as="span" color="muted" fontSize="10px" letterSpacing={1}>
                km/h
              </Text>
            </Text>
          </Td>
          <Td pl="0">
            <Flex alignItems="center" justifyContent="flex-end">
              {athlete.IsNewPr == true && (
                <Box mr="10px">
                  <div className="icon-pr"></div>
                </Box>
              )}

              <Box>
                <Text textAlign="right" noOfLines={1} fontSize="sm">
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

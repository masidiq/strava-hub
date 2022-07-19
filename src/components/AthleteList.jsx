import styles from "../styles/AthleteList.module.scss";
import { Avatar } from "@chakra-ui/react";
import moment from "moment";
import { Text, Flex, Box } from "@chakra-ui/react";

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
    <>
      <table className={styles.athlete}>
        <thead>
          <tr>
            <th style={{ width: "45px", padding: "5px 0" }}>Rank</th>
            <th style={{ width: "50px" }}></th>
            <th style={{ textAlign: "left" }}>Athlete</th>
            <th style={{ width: "66px" }}>Speed</th>
            <th
              style={{
                width: "100px",
                textAlign: "right",
                paddingRight: "27px",
              }}
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {props.athletes.map((athlete, index) => (
            <tr key={index}>
              <td>
                <Text fontSize="sm">{index + 1}</Text>
              </td>
              <td>
                <Avatar size="sm" name={athlete.Name} src={athlete.ImageUrl} />
              </td>
              <td>
                <div>
                  <div>
                    <Text noOfLines={1} fontSize="sm">
                      {athlete.Name}
                    </Text>

                    {athlete.Pr && (
                      <div>
                        <Text noOfLines={1} color="#8b8b8b" fontSize="xs">
                          {athlete.Pr} <span> • </span>
                          {relativeDateView(athlete.PrDate)}
                        </Text>
                      </div>
                    )}

                    {!athlete.Pr && (
                      <div>
                        <Text noOfLines={1} color="#8b8b8b" fontSize="xs">
                          -
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <Text textAlign="right" noOfLines={1} fontSize="sm">
                  {athlete.Speed}{" "}
                  <Text as="span" color="#8b8b8b" fontSize="xs">
                    km/h
                  </Text>
                </Text>
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

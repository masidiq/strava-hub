import styles from "../styles/AthleteList.module.scss";
import { Avatar } from "@chakra-ui/react";
import moment from "moment";
import { Text, Heading } from "@chakra-ui/react";
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
            <th style={{ width: "35px" }}>Rank</th>
            <th style={{ width: "50px" }}></th>
            <th style={{ textAlign: "left" }}>Athlete</th>
            <th style={{ width: "90px" }}>Speed</th>
            <th style={{ width: "95px" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.athletes.map((athlete, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Avatar size="sm" name={athlete.Name} src={athlete.ImageUrl} />
              </td>
              <td>
                <div>
                  <div>
                    <Text noOfLines={1}>{athlete.Name}</Text>

                    {athlete.Pr && (
                      <div>
                        <Text noOfLines={1} color="#8b8b8b" fontSize="xs">
                          {" "}
                          {athlete.Pr} <span> • </span>
                          {relativeDateView(athlete.PrDate)}
                        </Text>
                      </div>
                    )}

                    {!athlete.Pr && <div>-</div>}
                  </div>
                </div>
              </td>
              <td>
                <Text textAlign="right" noOfLines={1}>
                  {athlete.Speed}{" "}
                  <Text as="span" color={"grey"} fontSize="xs">
                    km/h
                  </Text>
                </Text>
              </td>
              <td>
                <Text textAlign="right" noOfLines={1}>
                  {athlete.Time}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

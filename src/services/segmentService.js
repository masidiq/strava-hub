import axios from "axios";
//const endpoint =  "https://strava-leaderboard.s3.ap-southeast-1.amazonaws.com/30711569_2022-07-19.json?t=1658242822594";

const endpoint =
  " https://strava-leaderboard.s3.ap-southeast-1.amazonaws.com/alltime/30711569.json";

export default {
  async getOne() {
    return await axios
      .get(endpoint)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
};

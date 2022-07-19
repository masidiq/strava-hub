import axios from "axios";
const endpoint =
  "https://strava-leaderboard.s3.ap-southeast-1.amazonaws.com/30711569_2022-07-17.json";

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

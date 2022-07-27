import axios from "axios";
const host = "https://localhost:44391/api";

let endpoint = {
  home: "https://localhost:44391",
  syncAllTime: host + "/syncAllTime",
  getProgress: host + "/progress",
};

export default {
  async ping() {
    return await axios
      .get(endpoint.home)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },

  async syncAllTime(segmentId) {
    let paramUrlStr = {
      params: {
        segmentId: segmentId,
      },
    };

    return await axios
      .get(endpoint.syncAllTime, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },

  async getProgress(progressId) {
    let paramUrlStr = {
      params: {
        progressId: progressId,
      },
    };

    return await axios
      .get(endpoint.getProgress, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
};

import axios from "axios";
const host = "https://localhost:44391/api";

let endpoint = {
  home: "https://localhost:44391",
  syncToday: host + "/syncToday",
  syncAllTime: host + "/syncAllTime",
  syncWomen: host + "/syncWomen",
  syncAge: host + "/syncAge",
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

  async syncToday(segmentId) {
    let paramUrlStr = {
      params: {
        segmentId: segmentId,
        forceUpdate: true,
      },
    };

    return await axios
      .get(endpoint.syncToday, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },

  async syncWomen(segmentId) {
    let paramUrlStr = {
      params: {
        segmentId: segmentId,
      },
    };

    return await axios
      .get(endpoint.syncWomen, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },

  async syncAge(segmentId) {
    let paramUrlStr = {
      params: {
        segmentId: segmentId,
      },
    };

    return await axios
      .get(endpoint.syncAge, paramUrlStr)
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

import axios from "axios";
const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

let endpoint = {
  syncToday: backEndHost + "/syncToday",
  syncAllTime: backEndHost + "/syncAllTime",
  syncWomen: backEndHost + "/syncWomen",
  syncAge: backEndHost + "/syncAge",
  getProgress: backEndHost + "/progress",
};

export default {
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

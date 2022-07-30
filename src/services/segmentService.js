import eqHttp from "./eqHttp";
const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

const endpoint = {
  getListDate: storageHost + "/date-list/{segmentId}.json",
  getLeaderboard: storageHost + "/leaderboard/{segmentId}/{date}.json",
  get: storageHost + "/segments/{segmentId}.json",
  getList: storageHost + "/segment-list.json",
  crudSegment: backEndHost + "/segment",
};

export default {
  async getListDate(id) {
    let param = {
      segmentId: id,
    };
    return await eqHttp
      .getJson(endpoint.getListDate, param)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
  async getLeaderboard(id, date) {
    let param = {
      segmentId: id,
      date: date,
    };
    return await eqHttp
      .getJson(endpoint.getLeaderboard, param)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },

  async get(id) {
    var url = endpoint.get;

    let param = {
      segmentId: id,
    };
    return await eqHttp.getJson(url, param);
  },

  async getList(isRealtime) {
    var url = endpoint.getList;

    if (isRealtime) {
      url += "?t=" + new Date().getTime();
    }
    return await eqHttp.get(url);
  },

  async add(segmentId) {
    return await eqHttp.post(endpoint.crudSegment, {
      id: segmentId,
    });
  },

  async edit(param) {
    return await eqHttp.put(endpoint.crudSegment, param);
  },

  async delete(segmentId) {
    return await eqHttp.delete(endpoint.crudSegment, {
      segmentId: segmentId,
    });
  },
};

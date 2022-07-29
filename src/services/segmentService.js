import eqHttp from "./eqHttp";
const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

const endpoint = {
  getLeaderboard: storageHost + "/segments/{segmentId}/{date}.json",
  getList: storageHost + "/segment-list.json",
  crudSegment: backEndHost + "/segment",
};

export default {
  async getLeaderboard() {
    let param = {
      segmentId: "",
      date: "",
    };
    return await eqHttp
      .getJson(endpoint, param)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
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

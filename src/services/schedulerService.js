import eqHttp from "./eqHttp";

const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

let endpoint = {
  getAll: storageHost + "/scheduler.json",
  edit: backEndHost + "/scheduller",
};

export default {
  async getAll() {
    return await eqHttp.getJson(endpoint.getAll, null, true).catch((error) => {
      if (error.response.status == 403) {
        return [];
      } else {
        return eqHttp.showError(error);
      }
    });
  },

  async edit(param) {
    return await eqHttp.put(endpoint.edit, param);
  },
};

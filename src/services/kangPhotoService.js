import eqDate from "../helpers/eqDate";
import eqHttp from "./eqHttp";
const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

const endpoint = {
  getList: storageHost + "/kang-photo-list.json",
  crud: backEndHost + "/kangPhoto",
};

export default {
  async getList(isRealtime) {
    var url = endpoint.getList;
    let notUseCache = false;
    if (eqDate.isMorning()) {
      notUseCache = true;
    }
    if (isRealtime) {
      notUseCache = true;
    }
    return await eqHttp.get(url, null, notUseCache);
  },

  async add(model) {
    return await eqHttp.post(endpoint.crud, model);
  },

  async edit(model) {
    return await eqHttp.put(endpoint.crud, model);
  },

  async delete(id) {
    return await eqHttp.delete(endpoint.crud, {
      id: id,
    });
  },
};

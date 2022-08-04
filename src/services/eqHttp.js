import axios from "axios";

import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default {
  showError(error) {
    let errorMsg = error.message;
    if (error.code == "ERR_NETWORK") {
      errorMsg = "Periksa koneksi internet anda";
    }
    toast({
      description: errorMsg,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  },

  async getJson(url, param, notUseCache) {
    Object.keys(param).forEach((key) => {
      url = url.replace("{" + key + "}", param[key]);
    });

    if (notUseCache) {
      url += "?t=" + new Date().getTime();
    }

    return await axios.get(url).then((response) => {
      return response.data;
    });
  },

  async get(url, param, notUseCache) {
    let paramUrlStr = null;

    if (notUseCache) {
      if (param) {
        param.t = new Date().getTime();
      } else {
        param = {
          t: new Date().getTime(),
        };
      }
    }

    if (param) {
      paramUrlStr = {
        params: param,
      };
    }

    return await axios
      .get(url, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError(error);
        throw error;
      });
  },

  async post(url, param) {
    return await axios
      .post(url, param)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError(error);
        throw error;
      });
  },

  async put(url, param) {
    return await axios
      .put(url, param)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError(error);
        throw error;
      });
  },

  async delete(url, param) {
    let paramUrlStr = {
      params: param,
    };
    return await axios
      .delete(url, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError(error);
        throw error;
      });
  },
};

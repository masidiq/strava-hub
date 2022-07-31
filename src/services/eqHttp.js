import axios from "axios";

import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default {
  showError(error) {
    toast({
      title: error.name,
      description: error.message,
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

    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError(error);
        throw error.response.data;
      });
  },

  async get(url, param) {
    let paramUrlStr = {
      params: param,
    };

    return await axios
      .get(url, paramUrlStr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
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

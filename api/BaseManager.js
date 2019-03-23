const path = require("path");
const { APIURL } = require(path.resolve("./config", process.env.NODE_ENV));
const axios = require("axios");

class BaseManager {
  constructor() {
    this.APIURL = APIURL;
  }
  getByParams(url = "", params = {}) {
    return axios.get(url, {
      params: params,
      timeout: 15000
    });
  }
  get(url = "") {
    return axios(url, {
      method: "GET",
      timeout: 15000
    });
  }
  postData(url = "", data = {}) {
    return axios(url, {
      method: "POST",
      data: data,
      timeout: 15000
    });
  }
  postNoData(url = "") {
    return axios(url, {
      method: "POST",
      timeout: 15000
    });
  }
  put(url = "", data = {}) {
    return axios(url, {
      method: "PUT",
      data: data,
      timeout: 15000
    });
  }
  putNoData(url = "") {
    return axios(url, {
      method: "PUT",
      timeout: 15000
    });
  }
  remove(url = "") {
    return axios(url, {
      method: "DELETE",
      timeout: 15000
    });
  }
  checkObject(obj){
    if (!obj || !Object.keys(obj).length) {
      return Promise.reject(new Error("Object is null"));
    }
  }
  checkField(field){
    if (!field) {
      return Promise.reject(new Error("Field is null"));
    }
  }
}

module.exports = BaseManager;

import axios from "axios";
/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const Request = (configs) => {
  const baseUrl = configs.baseUrl;
  const url = baseUrl + configs.path;
  const localDefaultHeaders = "{}";
  const defaultHeaders = JSON.parse(localDefaultHeaders);
  const headers = { ...configs.headers, ...defaultHeaders };
  configs = { ...configs, headers, url };
  console.log("REQUEST====", configs);
  return axios(configs);
};

export const GET = (path, configs) =>
  Request({ ...configs, path, method: "GET" });

export const POST = (path, configs) =>
  Request({ ...configs, path, method: "POST" });

export const PUT = (path, configs) =>
  Request({ ...configs, path, method: "PUT" });

export const PATCH = (path, configs) =>
  Request({ ...configs, path, method: "PATCH" });

export const DELETE = (path, configs) =>
  Request({ ...configs, path, method: "DELETE" });

export default Request;

export const PostReqAuth = async (url, data) => {
  let token = "";
  return await POST(url, {
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data,
  })
    .then((response) => response)
    .catch((error) => error.response);
};

export const PostReq = async (url, data) => {
  return await POST(url, {
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response) => response)
    .catch((error) => error.response);
};

export const GetReq = async (url, data) => {
  return await GET(url, {
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response) => response)
    .catch((error) => error.response);
};

export const PostReqBelvo = async (url, data) => {
  return await POST(url, {
    baseUrl: `${process.env.REACT_APP_BELVO_API}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response) => response)
    .catch((error) => error.response);
};

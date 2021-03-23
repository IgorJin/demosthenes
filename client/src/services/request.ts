import axios from "axios";

const apiPrefix = process.env.API_PREFIX || "/api/v1";

const get = async (url: string, data?: any, params?: any) => {
  return await sendRequest("get", data, url, params);
};

const put = async (url: string, data?: any, params?: any) => {
  return await sendRequest("put", data, url, params);
};

const post = async (url: string, data?: any, params?: any) => {
  return await sendRequest("post", data, url, params);
};

const sendRequest = async (
  method: string,
  dataToSend: any,
  url: string,
  params: any
) => {
  try {
    const fullPath = `${baseUrl}${apiPrefix}${url}`;
    //@ts-ignore
    const dataField = method === "get" ? "params" : "data";
    //@ts-ignore
    const { data } = await axios({
      method,
      url: fullPath,
      [dataField]: dataToSend,
      withCredentials: true,
      secure: true,
      ...params,
    });
    return { result: data.result, error: null };
  } catch (error) {
    try {
      const { message } = error.response.data.errors[0];
      return { result: null, error: message };
    } catch (parseError) {
      return { result: null, error: error.message };
    }
  }
};

export default { get, post, put };

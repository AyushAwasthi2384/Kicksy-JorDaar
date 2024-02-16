import { api, baseURL } from "./auth.api";
import axios from "axios";

export const axiosImageApi = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 5,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const addProduct = async (payload) => {
  try {
    const { data } = await api.post("/admin/add-product", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const uploadImage = async (payload) => {
  try {
    const { data } = await axiosImageApi.post(
      "/admin/add-product-image",
      payload
    );
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

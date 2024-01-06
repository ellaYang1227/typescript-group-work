import request from "@/plugins/axios";
import axios from "axios";
export const apiGetNews = () => {
  return request
    .get(`/api/v1/home/news/`)
    .then((res: any) => Promise.resolve(res.result));
};

export const apiGetSlideShow = () => {
  return axios
    .get("/slideshow.json")
    .then((res: any) => Promise.resolve(res.data.result));
};

export const apiGetCulinary = () => {
  return request
    .get(`/api/v1/home/culinary/`)
    .then((res: any) => Promise.resolve(res.result));
};

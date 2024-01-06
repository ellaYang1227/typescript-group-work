import request from "@/plugins/axios";
import { NewsItem, SlideShowItem, CulinaryItem } from "@/interfaces/home";
import axios from "axios";
export const apiGetNews = (): Promise<NewsItem[]> => {
  return request
    .get(`/api/v1/home/news/`)
    .then((res: any) => Promise.resolve(res.result));
};

export const apiGetSlideShow = (): Promise<SlideShowItem[]> => {
  return axios
    .get("/slideshow.json")
    .then((res: any) => Promise.resolve(res.data.result));
};

export const apiGetCulinary = (): Promise<CulinaryItem[]> => {
  return request
    .get(`/api/v1/home/culinary/`)
    .then((res: any) => Promise.resolve(res.result));
};

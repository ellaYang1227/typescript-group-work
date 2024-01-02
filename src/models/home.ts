import request from "@/plugins/axios";
export const apiGetNews = () => {
  return request
    .get(`/api/v1/home/news/`)
    .then((res: any) => Promise.resolve(res.result));
};

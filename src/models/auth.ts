import request from "@/plugins/axios";

export const apiGetUser = () => {
  return request.get(`/api/v1/user`);
};

export const apiLogin = (data: object) => {
  return request
    .post(
      `/api/v1/user/login`,
      {
        ...data,
      },
      { headers: { noShowLoading: true } }
    )
    .then((res: any) => Promise.resolve(res));
};

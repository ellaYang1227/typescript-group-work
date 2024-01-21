import request from "@/plugins/axios";
import { UserInformation, UserForgetPwd } from "@/interfaces/auth";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

export const apiGetUser = (): Promise<UserInformation> => {
  return request
    .get(`/api/v1/user`, { headers: { noShowLoading: true } })
    .then((res) => Promise.resolve(res.result));
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

export const apiSignup = (data: UserInformationWithPassword) => {
  return request
    .post(
      `/api/v1/user/signup`,
      {
        ...data,
      },
      { headers: { noShowLoading: true } }
    )
    .then((res: any) => Promise.resolve(res));
};

export const apiVerifyEmail = (email: string) => {
  return request
    .post(
      `/api/v1/verify/email`,

      {
        email: email,
      },
      { headers: { noShowLoading: true } }
    )
    .then((res) => Promise.resolve(res.result));
};

export const apiGenerateEmailCode = (email: string) => {
  return request
    .post(
      `/api/v1/verify/generateEmailCode`,

      {
        email: email,
      },
      { headers: { noShowLoading: true } }
    )
    .then((res) => Promise.resolve(res));
};

export const apiForgotPwd = (data: UserForgetPwd) => {
  return request
    .post(
      `/api/v1/user/forgot`,

      {
        ...data,
      },
      { headers: { noShowLoading: true } }
    )
    .then((res) => Promise.resolve(res));
};

export const apiUpdateUserInfo = (data: object) => {
  return request
    .put(`api/v1/user`, { ...data })
    .then((res: any) => Promise.resolve(res.result));
};

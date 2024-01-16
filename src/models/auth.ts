import request from "@/plugins/axios";
import { UserInformation } from "@/interfaces/auth";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

export const apiGetUser = (): Promise<UserInformation> => {
  return request
    .get(`/api/v1/user`, { headers: { noShowLoading: true } })
    .then((res: any) => Promise.resolve(res.result));
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
    .then((res: any) => Promise.resolve(res));
};

export const apiUpdateUserInfo = (data: object) => {
  return request
    .put(`api/v1/user`, { ...data })
    .then((res: any) => Promise.resolve(res.result));
};

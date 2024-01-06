import request from "@/plugins/axios";
import { UserInfo, UserInformation } from "@/interfaces/auth";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

export const apiGetUser = (): Promise<UserInfo> => {
  return request.get(`/api/v1/user`)
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

import request from "@/plugins/axios";
import { UserInformation } from "@/interfaces/auth";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

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

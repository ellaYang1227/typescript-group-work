export interface IUserInfo {
  token: string,
  email: string,
  password: string,
}

export interface UserInfo {
  address: {
    zipcode: number,
    detail: string
  },
  name: string
  phone: string,
  email: string
}

export interface UserInfo {
  address: {
    zipcode: number;
    detail: string;
  };
  name: string;
  phone: string;
  email: string;
}

interface Address {
  zipcode: number;
  detail: string;
  county: string;
  city: string;
}

export interface UserInformation {
  address: Address;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  [key: string]: any;
}

export interface UserLogin {
  email: string;
  password: string;
}

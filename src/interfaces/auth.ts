export interface UserInfo {
  address: {
    zipcode: number;
    detail: string;
  };
  name: string;
  phone: string;
  email: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface Address {
  zipcode: number;
  detail: string;
  county?: string;
  city?: string;
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

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
}

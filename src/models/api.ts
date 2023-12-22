import request from "@/plugins/axios";

export function Login(data: object) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function User() {
  return request({
    url: "/user",
    method: "get",
  });
}

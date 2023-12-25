import request from "@/plugins/axios";

export function apiGetUser() {
  return request({
    url: "/api/v1/user/",
    method: "get",
  });
}

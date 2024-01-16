import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  const cookieValue = Cookies.get(key);
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue);
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const saveCookie = (key: string, state: string) => {
  return Cookies.set(key, JSON.stringify(state), {
    expires: 7,
    sameSite: "strict",
    domain: window.location.hostname,
  });
};

export const removeCookie = (key: string) => {
  return Cookies.remove(key, { path: "/", domain: window.location.hostname });
};

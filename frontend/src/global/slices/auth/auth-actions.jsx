import { AUTH_URL, IS_ADMIN_URL } from "../../fetch/urls/urls";
import { decrypt, encrypt } from "../../global";
import Cookies from "js-cookie";

const secretKey = import.meta.env.VITE_AES_KEY;
const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;

export const auth = async (authInfo) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify(authInfo),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    if (!data.success) {
      return -13;
    }

    const AUTH_INFO_STORAGE = {
      isAuth: data.success,
      isAdmin: data.isAdmin,
      token: data.token,
      name: data.user.name,
      username: data.user.username,
    };

    const enc = encrypt(JSON.stringify(AUTH_INFO_STORAGE), secretKey);
    const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000);
    Cookies.set("authInfo", enc, {
      expires: expirationTime,
      secure: true,
      sameSite: "strict",
    });

    return 8;
  } catch (err) {
    console.log(err);
    return -100;
  }
};

export const logout = () => {
  Cookies.remove("authInfo");
};

export const isAdmin = () => {
  if (Cookies.get("authInfo")) {
    const dec = Cookies.get("authInfo");
    const authString = decrypt(dec, secretKey);

    const authInfo = JSON.parse(authString);

    return authInfo.isAdmin ? authInfo.isAdmin : false;
  }

  return false;
};

export const isAuth = () => {
  if (Cookies.get("authInfo")) {
    const dec = Cookies.get("authInfo");
    const authString = decrypt(dec, secretKey);

    const authInfo = JSON.parse(authString);

    return authInfo.isAuth ? authInfo.isAuth : false;
  }

  return false;
};

export const getAuthUsername = () => {
  if (Cookies.get("authInfo")) {
    const dec = Cookies.get("authInfo");
    const authString = decrypt(dec, secretKey);
    const authInfo = JSON.parse(authString);

    return authInfo.username ? authInfo.username : "NULL";
  }

  return "NULL";
};

export const getAuthName = () => {
  if (Cookies.get("authInfo")) {
    const dec = Cookies.get("authInfo");
    const authString = decrypt(dec, secretKey);
    const authInfo = JSON.parse(authString);

    return authInfo.name ? authInfo.name : "NULL";
  }

  return "NULL";
};

export const getAuthToken = () => {
  if (Cookies.get("authInfo")) {
    const dec = Cookies.get("authInfo");
    const authString = decrypt(dec, secretKey);
    const authInfo = JSON.parse(authString);

    return authInfo.token ? authInfo.token : "NULL";
  }

  return "NULL";
};

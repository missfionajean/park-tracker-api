const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const signup = async (formData) => {
  try {
    const res = await fetch(`${djangoApiUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.log("error signing up", error.message);
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${djangoApiUrl}/auth-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const jsonData = await res.json();
    console.log(jsonData);
    if (!jsonData.access) {
      throw new Error("Error sign in. try again");
    }
    Cookies.set("jwtToken", jsonData.access, {
      expires: 7, // cookie will expire in 7 days
      //secure: true, // Ensures the cookie is only sent to the server over secure HTTPS connections
      sameSite: "strict", // make sure the request originates from the same domain as the one that set the cookie.
    });
    const userInfo = jwtDecode(jsonData.access); // return the user's info
    return userInfo;
  } catch (error) {
    console.log("error signing in", error.message);
  }
};

export const getUser = () => {
  try {
    const token = Cookies.get("jwtToken");
    if (!token) return null;
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.log("Failed to decode", error.message);
  }
};

export const signout = () => {
  Cookies.remove("jwtToken");
};

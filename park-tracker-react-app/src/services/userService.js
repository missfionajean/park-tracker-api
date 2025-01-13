const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;
import Cookies from "js-cookie";

export const getAllTrips = async () => {
  try {
    const res = await fetch(`${djangoApiUrl}/user`, {
      headers: { Autorization: `Bearer ${Cookies.get("jwtToken")}` },
    });
    const jsonData = res.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.log("Failed fetching users", error.message);
  }
};

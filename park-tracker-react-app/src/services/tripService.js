//const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;
// import Cookies from "js-cookie";

export const getAllTrips = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/trip`)
    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.log("Failed fetching trips", error.message);
  }
};

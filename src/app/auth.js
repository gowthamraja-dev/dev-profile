import { BASE_URL } from "../api/baseUrl";
import { setUser } from "../Data/Slice/loginSlice";
import { Paths } from "../Routes/path";
import { store } from "./store";

export const checkUser = async () => {
  console.log("Checking user...");
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-User-ID": "",
      },
    });
    if (response.ok) {
      const userData = await response.json();
      store.dispatch(setUser(userData));
      console.log(userData.user_id);
    }
  } catch (error) {
    console.error("Error checking user:", error);
  }
};

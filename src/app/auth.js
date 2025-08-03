import { BASE_URL } from "../api/baseUrl";
import { navigateTo } from "../common/functions";
import { setUser } from "../Data/Slice/loginSlice";
import { Paths } from "../Routes/path";
import { store } from "./store";

export const checkUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-User-ID": "",
      },
    });
    if (response.status === 200) {
      const userData = await response.json();
      store.dispatch(setUser(userData));
    } else if (response.status === 401) {
      store.dispatch(setUser(null));
      navigateTo(Paths.HOME);
    }
  } catch (error) {
    console.error("Error checking user:", error);
  }
};

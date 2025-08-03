import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { checkUser } from "./app/auth";
import { useLocalStorage } from "./app/hooks";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const queryUserId = queryParams.get("userId");
  const { get: getUserId } = useLocalStorage("userId", queryUserId);
  const userId = getUserId();

  useEffect(() => {
    checkUser(userId);
  }, [userId]);

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;

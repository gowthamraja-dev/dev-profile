import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { checkUser } from "./app/auth";

const App = () => {
  useEffect(() => {
    checkUser();
  }, []);
  console.log("App component rendered", process.env.PUBLIC_URL);
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { checkUser } from "./app/auth";

const App = () => {
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

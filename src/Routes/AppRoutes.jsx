import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import BaseLayout from "../Layout/BaseLayout";
import { Paths } from "./path";
import GoogleSignUp from "../Features/GoogleSignUp";

const Login = lazy(() => import("../Features/SignIn/Login"));

const AppRoutes = () => {
  return (
    <div>
      <BaseLayout>
        <Routes>
          <Route path={Paths.HOME} element={<Login />} />
          <Route path={Paths.LOGIN} element={<GoogleSignUp />} />
        </Routes>
      </BaseLayout>
    </div>
  );
};

export default AppRoutes;

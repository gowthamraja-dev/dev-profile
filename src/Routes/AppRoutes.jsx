import React from "react";
import BaseLayout from "../Layout/BaseLayout";
import Home from "../Features/Home";

const AppRoutes = () => {
  return (
    <div>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </div>
  );
};

export default AppRoutes;

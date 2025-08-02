import React from "react";
import ThemeToggleButton from "../ThemeProvider/ThemeToggleButton";
import logo from "../assets/images/GLogo.png";
import Profile from "./Components.jsx/Profile";

const BaseHeader = () => {
  return (
    <header className="bg-background justify-between min-h-[10vh] flex items-center px-5">
      <img src={logo} alt="Logo" className="w-8 md:w-12 lg:w-16" />
      <ThemeToggleButton />
      <Profile />
    </header>
  );
};

export default BaseHeader;

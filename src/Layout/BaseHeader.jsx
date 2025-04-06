import React from "react";
import ThemeToggleButton from "../ThemeProvider/ThemeToggleButton";
import logo from "../assets/images/gowthamLogo.png";

const BaseHeader = () => {
  return (
    <header className="bg-background justify-between min-h-[10vh] flex items-center px-5">
      <img src={logo} alt="Logo" className="w-12 md:w-20 lg:w-32" />
      <ThemeToggleButton />
    </header>
  );
};

export default BaseHeader;

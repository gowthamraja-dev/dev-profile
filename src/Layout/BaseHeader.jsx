import React from "react";
import ThemeToggleButton from "../ThemeProvider/ThemeToggleButton";

const BaseHeader = () => {
  return (
    <header className="bg-background justify-between min-h-[10vh] flex items-center px-5">
      Header <ThemeToggleButton />
    </header>
  );
};

export default BaseHeader;

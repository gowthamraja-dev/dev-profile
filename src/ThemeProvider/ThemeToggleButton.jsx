import React from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "./ThemeProvieder";
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;

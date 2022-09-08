import React, { useState, useContext } from "react";
import { FilterNav } from "../../component/molecules";
import Home from "../../pages";
import styles from "../../styles/Home.module.css";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useToggle() {
  return useContext(ThemeUpdateContext);
}

function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  console.log("theme", darkTheme);
  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

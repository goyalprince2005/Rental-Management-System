
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// =========================================================
// OWNER THEME CONFIGURATION
// =========================================================

const OWNER_THEME_STORAGE_KEY = "rentalManagementOwnerTheme";
const DEFAULT_OWNER_THEME = "light";

const OwnerThemeContext = createContext(null);

// =========================================================
// GET INITIAL OWNER THEME
// =========================================================

const getInitialOwnerTheme = () => {
  try {
    const savedTheme = localStorage.getItem(OWNER_THEME_STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (error) {
    console.error("Unable to read owner theme preference:", error);
  }

  return DEFAULT_OWNER_THEME;
};

// =========================================================
// OWNER THEME PROVIDER
// =========================================================

export function OwnerThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialOwnerTheme);

  const isDarkMode = theme === "dark";

  // =======================================================
  // SAVE OWNER THEME IN LOCAL STORAGE
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(OWNER_THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Unable to save owner theme preference:", error);
    }
  }, [theme]);

  // =======================================================
  // SET THEME
  // =======================================================

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme !== "dark" && nextTheme !== "light") {
      console.warn("Invalid owner theme. Use 'dark' or 'light'.");
      return;
    }

    setThemeState(nextTheme);
  }, []);

  // =======================================================
  // TOGGLE THEME
  // =======================================================

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }, []);

  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const contextValue = {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  };

  return (
    <OwnerThemeContext.Provider value={contextValue}>
      {children}
    </OwnerThemeContext.Provider>
  );
}

// =========================================================
// CUSTOM OWNER THEME HOOK
// =========================================================

export function useOwnerTheme() {
  const context = useContext(OwnerThemeContext);

  if (!context) {
    throw new Error(
      "useOwnerTheme must be used inside OwnerThemeProvider."
    );
  }

  return context;
}

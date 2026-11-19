
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const TENANT_THEME_STORAGE_KEY = "rentalManagementTenantTheme";
const DEFAULT_TENANT_THEME = "light";

const TenantThemeContext = createContext(null);

// =========================================================
// GET INITIAL TENANT THEME
// =========================================================

const getInitialTenantTheme = () => {
  try {
    const savedTheme = localStorage.getItem(TENANT_THEME_STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (error) {
    console.error("Unable to read tenant theme preference:", error);
  }

  return DEFAULT_TENANT_THEME;
};

// =========================================================
// TENANT THEME PROVIDER
// =========================================================

export function TenantThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTenantTheme);

  const isDarkMode = theme === "dark";

  // =======================================================
  // SAVE TENANT THEME IN LOCAL STORAGE
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(TENANT_THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Unable to save tenant theme preference:", error);
    }
  }, [theme]);

  // =======================================================
  // SET THEME
  // =======================================================

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme !== "dark" && nextTheme !== "light") {
      console.warn("Invalid tenant theme. Use 'dark' or 'light'.");
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
    <TenantThemeContext.Provider value={contextValue}>
      {children}
    </TenantThemeContext.Provider>
  );
}

// =========================================================
// CUSTOM TENANT THEME HOOK
// =========================================================

export function useTenantTheme() {
  const context = useContext(TenantThemeContext);

  if (!context) {
    throw new Error(
      "useTenantTheme must be used inside TenantThemeProvider."
    );
  }

  return context;
}

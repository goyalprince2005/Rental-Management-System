import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// =========================================================
// TENANT THEME CONFIGURATION
// =========================================================

const TENANT_THEME_STORAGE_KEY =
  "rentalManagementTenantTheme";

const DEFAULT_TENANT_THEME = "light";

// =========================================================
// CREATE TENANT THEME CONTEXT
// =========================================================

const TenantThemeContext = createContext(null);

// =========================================================
// GET INITIAL THEME
// =========================================================

const getInitialTenantTheme = () => {
  try {
    const savedTheme = localStorage.getItem(
      TENANT_THEME_STORAGE_KEY
    );

    if (
      savedTheme === "dark" ||
      savedTheme === "light"
    ) {
      return savedTheme;
    }
  } catch (error) {
    console.error(
      "Unable to read tenant theme preference:",
      error
    );
  }

  return DEFAULT_TENANT_THEME;
};

// =========================================================
// TENANT THEME PROVIDER
// =========================================================

export function TenantThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    getInitialTenantTheme
  );

  // =======================================================
  // DERIVED THEME STATE
  // =======================================================

  const isDarkMode = theme === "dark";

  // =======================================================
  // APPLY THEME GLOBALLY TO HTML ROOT
  // =======================================================

  useEffect(() => {
    const root = document.documentElement;

    // Apply or remove Tailwind's dark mode class.
    root.classList.toggle("dark", isDarkMode);

    // Apply browser-native light/dark appearance.
    root.style.colorScheme = theme;

  }, [isDarkMode, theme]);

  // =======================================================
  // SAVE THEME PREFERENCE
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        TENANT_THEME_STORAGE_KEY,
        theme
      );
    } catch (error) {
      console.error(
        "Unable to save tenant theme preference:",
        error
      );
    }
  }, [theme]);

  // =======================================================
  // SET THEME
  // =======================================================

  const setTheme = useCallback((nextTheme) => {
    if (
      nextTheme !== "light" &&
      nextTheme !== "dark"
    ) {
      console.warn(
        "Invalid tenant theme. Use 'light' or 'dark'."
      );

      return;
    }

    setThemeState(nextTheme);
  }, []);

  // =======================================================
  // TOGGLE LIGHT / DARK MODE
  // =======================================================

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) =>
      currentTheme === "light"
        ? "dark"
        : "light"
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

  // =======================================================
  // PROVIDER
  // =======================================================

  return (
    <TenantThemeContext.Provider
      value={contextValue}
    >
      {children}
    </TenantThemeContext.Provider>
  );
}

// =========================================================
// CUSTOM HOOK
// =========================================================

export function useTenantTheme() {
  const context = useContext(
    TenantThemeContext
  );

  if (!context) {
    throw new Error(
      "useTenantTheme must be used inside TenantThemeProvider."
    );
  }

  return context;
}

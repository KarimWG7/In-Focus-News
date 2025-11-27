import { create } from "zustand";

type ThemeState = {
  isDarkMode: boolean;
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => {
  const changeToDarkMode = () => {
    document.body.classList.add("dark");
    set({ isDarkMode: true });
  };
  const changeToLightMode = () => {
    document.body.classList.remove("dark");
    set({ isDarkMode: false });
  };
  const initializeTheme = () => {
    if (localStorage.getItem("mode") === "dark") {
      changeToDarkMode();
    }
  };
  initializeTheme();
  return {
    isDarkMode: localStorage.getItem("mode") === "dark",

    toggleMode: () => {
      const isDark = get().isDarkMode;
      localStorage.setItem("mode", !isDark ? "dark" : "light");
      if (isDark) {
        changeToLightMode();
      } else {
        changeToDarkMode();
      }
    },
  };
});

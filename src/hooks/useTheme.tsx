import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("meukat-theme");
    if (stored) return stored as Theme;

    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("meukat-theme", theme);
  }, [theme]);

  useEffect(() => {
    const checkAutoSwitch = () => {
      const stored = localStorage.getItem("meukat-theme-manual");
      if (stored) return;

      const hour = new Date().getHours();
      const shouldBeDark = hour >= 18 || hour < 6;
      const newTheme = shouldBeDark ? "dark" : "light";

      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    };

    const interval = setInterval(checkAutoSwitch, 60000);
    return () => clearInterval(interval);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("meukat-theme-manual", "true");
  };

  const resetAutoSwitch = () => {
    localStorage.removeItem("meukat-theme-manual");
    const hour = new Date().getHours();
    setTheme(hour >= 18 || hour < 6 ? "dark" : "light");
  };

  return { theme, toggleTheme, resetAutoSwitch };
};

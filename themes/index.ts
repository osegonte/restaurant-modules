import { italianTheme } from "./italian";
import { asianTheme } from "./asian";
import { veganTheme } from "./vegan";
import { cafeTheme } from "./cafe";

export const themes = {
  italian: italianTheme,
  asian: asianTheme,
  vegan: veganTheme,
  cafe: cafeTheme,
};

export type ThemeName = keyof typeof themes;

export function applyTheme(themeName: ThemeName) {
  const theme = themes[themeName];
  
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-secondary", theme.colors.secondary);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-foreground", theme.colors.foreground);
    root.style.setProperty("--font-heading", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);
  }
}

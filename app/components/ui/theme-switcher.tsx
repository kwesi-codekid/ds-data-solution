import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../icons/Moon";
import { SunIcon } from "../icons/Sun";
import { useTheme } from "next-themes";
import { useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isLightTheme, setIsLightTheme] = useState(
    theme === "dark" ? false : true
  ); // Initial state based on theme

  return (
    <Switch
      isSelected={isLightTheme}
      size="sm"
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={(value) => {
        setIsLightTheme(value);
        setTheme(value ? "light" : "dark");
      }}
    />
  );
};

export default ThemeSwitcher;

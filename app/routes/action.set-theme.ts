import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "~/theme-session";

export const action = createThemeAction(themeSessionResolver);

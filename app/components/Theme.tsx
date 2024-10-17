import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const THEMES = [
	"pink" as const,
	"cyan" as const,
	"emerald" as const,
	"yellow" as const,
];
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "pink";

const ThemeContext = createContext<Theme>(DEFAULT_THEME);

export interface ThemeProviderProps {
	theme: Theme;
	children: ReactNode;
}

export function ThemeProvider({
	theme,
	children,
}: ThemeProviderProps): ReactNode {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}

export function useTheme(): Theme {
	const theme = useContext(ThemeContext);
	return theme;
}

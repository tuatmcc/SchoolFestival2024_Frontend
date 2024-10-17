import "~/tailwind.css";

import { DecoratorHelpers } from "@storybook/addon-themes";
import type { Preview, ReactRenderer, StoryContext } from "@storybook/react";
import { useEffect } from "react";
import { DEFAULT_THEME, ThemeProvider, THEMES } from "~/components/Theme";
import type { Theme } from "~/components/Theme";
import type { DecoratorFunction } from "storybook/internal/types";
import { appThemes } from "~/root";
import { Background } from "~/components/Background";

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } =
	DecoratorHelpers;

function withProvider(): DecoratorFunction<ReactRenderer> {
	initializeThemeState(THEMES, DEFAULT_THEME);

	return (Story, context) => {
		const selectedTheme = pluckThemeFromContext(context);
		const { themeOverride } = useThemeParameters();

		const selected = (themeOverride ?? selectedTheme ?? DEFAULT_THEME) as Theme;
		useEffect(() => {
			const $body = document.querySelector("body");
			if (!$body) return;

			const classes = appThemes();
			if (classes) $body.classList.add(...classes.split(" "));

			return () => {
				if (classes) $body.classList.remove(...classes.split(" "));
			};
		}, []);

		return (
			<ThemeProvider theme={selected}>
				<Background />
				<Story />
			</ThemeProvider>
		);
	};
}

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		actions: {
			argTypesRegex: "^on[A-Z].*",
		},
	},
	decorators: [withProvider()],
};

export default preview;

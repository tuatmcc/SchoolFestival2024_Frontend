import "~/tailwind.css";

import { DecoratorHelpers } from "@storybook/addon-themes";
import type { Preview, ReactRenderer, StoryContext } from "@storybook/react";
import { useEffect } from "react";
import { DEFAULT_THEME, ThemeProvider, THEMES } from "~/components/Theme";
import type { Theme } from "~/components/Theme";
import type { DecoratorFunction } from "storybook/internal/types";
import { appThemes } from "~/root";

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

			// biome-ignore lint/complexity/noForEach: This is a simple loop
			THEMES.filter((theme) => theme !== selected).forEach((theme) => {
				const classes = appThemes({ theme });
				if (classes) $body.classList.remove(...classes.split(" "));
			});

			const newClasses = appThemes({ theme: selected });
			if (newClasses) $body.classList.add(...newClasses.split(" "));
		});

		return (
			<ThemeProvider theme={selected}>
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

import "~/tailwind.css";

import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";
import { appThemes } from "../app/root";

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
	decorators: [
		withThemeByClassName<ReactRenderer>({
			themes: {
				pink: appThemes({ theme: "pink" }),
				cyan: appThemes({ theme: "cyan" }),
				emerald: appThemes({ theme: "emerald" }),
				yellow: appThemes({ theme: "yellow" }),
			},
			defaultTheme: "pink",
		}),
	],
};

export default preview;

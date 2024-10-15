import "~/tailwind.css";

import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

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
				pink: "font-delagothic text-white",
			},
			defaultTheme: "pink",
		}),
	],
};

export default preview;

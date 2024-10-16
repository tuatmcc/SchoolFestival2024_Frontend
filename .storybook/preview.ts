import "~/tailwind.css";

import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";

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

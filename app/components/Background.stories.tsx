import type { Meta, StoryObj } from "@storybook/react";

import { Background } from "./Background";

const meta: Meta<typeof Background> = {
	title: "Components/Background",
	component: Background,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

export const Default: StoryObj<typeof Background> = {};

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	argTypes: {
		background: {
			control: "boolean",
		},
	},
};

export default meta;

export const Default: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
	},
};

export const NoBackground: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		background: false,
	},
};

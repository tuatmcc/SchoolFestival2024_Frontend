import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	argTypes: {
		variant: {
			control: "select",
			options: ["pink", "cyan", "emerald", "yellow"],
		},
		background: {
			control: "boolean",
		},
	},
};

export default meta;

export const Pink: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		variant: "pink",
	},
};

export const Cyan: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		variant: "cyan",
	},
};

export const Emerald: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		variant: "emerald",
	},
};

export const Yellow: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		variant: "yellow",
	},
};

export const NoBackground: StoryObj<typeof Button> = {
	args: {
		children: "ボタン",
		background: false,
	},
};

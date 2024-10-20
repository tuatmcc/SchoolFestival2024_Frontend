import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
	title: "Components/Heading",
	component: Heading,
};

export default meta;

export const Default: StoryObj<typeof Heading> = {
	args: {
		children: "見出し1",
	},
};

export const Heading2: StoryObj<typeof Heading> = {
	args: {
		level: 2,
		children: "見出し2",
	},
};

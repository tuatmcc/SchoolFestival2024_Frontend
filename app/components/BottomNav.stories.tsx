import type { Meta, StoryObj } from "@storybook/react";

import { BottomNav } from "./BottomNav";

const meta: Meta<typeof BottomNav> = {
	title: "Components/BottomNav",
	component: BottomNav,
	argTypes: {
		background: {
			control: "boolean",
		},
	},
};

export default meta;

export const Default: StoryObj<typeof BottomNav> = {};

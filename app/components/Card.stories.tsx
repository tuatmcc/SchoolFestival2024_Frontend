import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	args: {
		style: { width: "600px", height: "300px" },
	},
};

export default meta;

export const Default: StoryObj<typeof Card> = {};

import type { Meta, StoryObj } from "@storybook/react";

import { LoginCard } from "./LoginCard";

const meta: Meta<typeof LoginCard> = {
	title: "Components/LoginCard",
	component: LoginCard,
	args: {
		style: { width: "600px", height: "300px" },
	},
};

export default meta;

export const Default: StoryObj<typeof LoginCard> = {};

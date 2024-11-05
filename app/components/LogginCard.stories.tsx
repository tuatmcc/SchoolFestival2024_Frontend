import type { Meta, StoryObj } from "@storybook/react";

import { LogginCard } from "./LogginCard";

const meta: Meta<typeof LogginCard> = {
	title: "Components/LogginCard",
	component: LogginCard,
	args: {
		style: { width: "600px", height: "300px" },
	},
};

export default meta;

export const Default: StoryObj<typeof LogginCard> = {};

import type { Meta, StoryObj } from "@storybook/react";

import { CardButton } from "./CardButton";

const meta: Meta<typeof CardButton> = {
	title: "Components/CardButton",
	component: CardButton,
	decorators: [
		(Story) => (
			<div className="flex">
				<Story />
			</div>
		),
	],
};

export default meta;

export const Default: StoryObj<typeof CardButton> = {
	args: {},
};

export const Checked: StoryObj<typeof CardButton> = {
	args: {
		checked: true,
	},
};

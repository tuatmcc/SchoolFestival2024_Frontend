import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
};

export default meta;

export const Default: StoryObj<typeof Input> = {
	args: {
		defaultValue: "テキスト",
	},
};

export const Placeholder: StoryObj<typeof Input> = {
	args: {
		placeholder: "テキスト",
	},
};

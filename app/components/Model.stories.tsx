import type { Meta, StoryObj } from "@storybook/react";

import { ModelViewer } from "./Model";

const meta: Meta<typeof ModelViewer> = {
	title: "Components/Model",
	component: ModelViewer,
	argTypes: {
		model: {
			options: ["jiraichan", "necochan", "asuka", "kaiju", "sushong"],
		},
		costume: {
			control: "radio",
			options: [0, 1, 2],
		},
		accessory: {
			options: ["none", "glasses", "goggle", "halo", "eyepatch"],
		},
	},
	args: {
		model: "jiraichan",
		costume: 0,
		accessory: "none",
	},
};

export default meta;

export const Default: StoryObj<typeof ModelViewer> = {};

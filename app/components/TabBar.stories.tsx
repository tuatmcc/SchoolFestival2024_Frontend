import type { Meta, StoryObj } from "@storybook/react";

import { createRemixStub } from "@remix-run/testing";
import { TabBar } from "./TabBar";

const meta: Meta<typeof TabBar> = {
	title: "Components/TabBar",
	component: TabBar,
	argTypes: {
		path: {
			control: "radio",
			options: ["/clothes", "/hair", "/hairColor"],
		},
	},
	decorators: [
		(Story) => {
			const RemixStub = createRemixStub([
				{
					path: "*",
					Component: Story,
				},
			]);

			return <RemixStub />;
		},
	],
};

export default meta;

export const Default: StoryObj<typeof TabBar> = {
	args: {
		path: "/clothes",
	},
};

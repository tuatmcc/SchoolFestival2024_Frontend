import type { Meta, StoryObj } from "@storybook/react";

import { BottomNav } from "./BottomNav";
import { createRemixStub } from "@remix-run/testing";

const meta: Meta<typeof BottomNav> = {
	title: "Components/BottomNav",
	component: BottomNav,
	argTypes: {
		path: {
			control: "radio",
			options: ["/", "/edit", "/play", "/guide"],
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

export const Default: StoryObj<typeof BottomNav> = {
	args: {
		path: "/",
	},
};

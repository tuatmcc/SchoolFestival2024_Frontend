import type { Meta, StoryObj } from "@storybook/react";

import * as Tabs from "@radix-ui/react-tabs";
import { TabBar } from "./TabBar";

const meta: Meta<typeof TabBar> = {
	title: "Components/TabBar",
	component: TabBar,
	decorators: [
		(Story) => {
			return (
				<Tabs.Root>
					<Story />
				</Tabs.Root>
			);
		},
	],
};

export default meta;

export const Default: StoryObj<typeof TabBar> = {};

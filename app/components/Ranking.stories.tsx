import type { Meta, StoryObj } from "@storybook/react";
import { RankingList } from "./Ranking";

const meta: Meta<typeof RankingList> = {
	title: "Components/RankingList",
	component: RankingList,
};

export default meta;

export const Default: StoryObj<typeof RankingList> = {};

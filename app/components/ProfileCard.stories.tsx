import type { Meta, StoryObj } from "@storybook/react";

import { ProfileCard } from "./ProfileCard";

const meta: Meta<typeof ProfileCard> = {
	title: "Components/ProfileCard",
	component: ProfileCard,
};

export default meta;

export const Default: StoryObj<typeof ProfileCard> = {
	args: {
		profile: {
			id: "0123-4567-89ab-cdef",
			displayName: "しゅん",
			playCount: 10,
			highScore: 1234,
			rank: 3,
		},
	},
};

export const NoPlay: StoryObj<typeof ProfileCard> = {
	args: {
		profile: {
			id: "0123-4567-89ab-cdef",
			displayName: "しゅん",
			playCount: 0,
			highScore: null,
			rank: null,
		},
	},
};

export const LongName: StoryObj<typeof ProfileCard> = {
	args: {
		profile: {
			id: "0123-4567-89ab-cdef",
			displayName:
				"あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
			playCount: 10,
			highScore: 1234,
			rank: 3,
		},
	},
};

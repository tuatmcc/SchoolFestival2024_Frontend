export const MODEL_LIST = [
	"jiraichan",
	"necochan",
	"asuka",
	"kaiju",
	"sushong",
] as const;

export type Model = (typeof MODEL_LIST)[number];

export const ACCESSORY_LIST = [
	"none",
	"glasses",
	"goggle",
	"halo",
	"eyepatch",
] as const;

export type Accessory = (typeof ACCESSORY_LIST)[number];

export interface CharacterSetting {
	character: Model;
	costume: number;
	accessory: Accessory;
	hair: string;
}

export interface Profile {
	id: string;
	displayName: string;
	playCount: number;
	highScore: number | null;
	rank: number | null;
	characterSetting: CharacterSetting;
}

export type UpdateProfileBody = {
	profile: Partial<Pick<Profile, "displayName" | "characterSetting">>;
};

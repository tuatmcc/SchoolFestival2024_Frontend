import * as v from "valibot";

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

export interface Ranking {
	id: string;
	displayName: string;
	highScore: number;
	rank: number;
}

export const UpdateDisplayNameSchema = v.object({
	displayName: v.pipe(
		v.string("入力してください。"),
		v.minLength(1, "入力してください。"),
		v.maxLength(8, "8文字以内で入力してください。"),
	),
});
export type UpdateDisplayNameFormData = v.InferInput<
	typeof UpdateDisplayNameSchema
>;

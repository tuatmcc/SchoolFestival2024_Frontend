export interface Profile {
	id: string;
	displayName: string;
	playCount: number;
	highScore: number | null;
	rank: number | null;
}

export type UpdateProfileBody = {
	profile: Partial<Pick<Profile, "displayName">>;
};

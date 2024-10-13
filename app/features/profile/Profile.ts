export interface Profile {
	id: string;
	displayName: string;
}

export type UpdateProfileBody = {
	profile: Partial<Pick<Profile, "displayName">>;
};

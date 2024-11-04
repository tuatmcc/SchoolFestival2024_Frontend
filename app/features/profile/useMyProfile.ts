import { useCallback } from "react";
import useSWR from "swr";
import * as v from "valibot";
import {
	ACCESSORY_LIST,
	type CharacterSetting,
	MODEL_LIST,
	type Profile,
	type UpdateProfileBody,
} from "~/features/profile/Profile";
import type { Json } from "~/libs/database";
import { supabase } from "~/libs/supabase";
import { useSession } from "../../hooks/useSession";

interface UseMyProfile {
	myProfile: Profile | null;
	error: unknown;
	isValidating: boolean;

	updateMyProfile: (params: UpdateProfileBody) => Promise<void>;
}

export function useMyProfile(): UseMyProfile {
	const session = useSession();

	const {
		data: myProfile,
		error,
		mutate,
		isValidating,
	} = useSWR(
		["/profile/me", session?.user.id],
		async ([_, userId]) => {
			if (!userId) return null;

			const { data: rawProfile } = await supabase
				.from("profiles_with_stats")
				.select(
					"user_id, display_name, high_score, play_count, rank, character_setting",
				)
				.eq("user_id", userId)
				.limit(1)
				.single();

			if (!rawProfile) return null;

			const characterSetting = convertCharacterSetting(
				rawProfile.character_setting,
			);

			const profile: Profile = {
				id: rawProfile.user_id,
				displayName: rawProfile.display_name,
				playCount: rawProfile.play_count,
				highScore: rawProfile.high_score,
				rank: rawProfile.rank,
				characterSetting,
			};

			return profile;
		},
		{
			suspense: true,
			refreshInterval: 1000 * 10,
			fallbackData: null,
		},
	);

	const updateMyProfile = useCallback(
		async ({ profile }: UpdateProfileBody) => {
			if (!session) throw new Error("Can't update profile without session");
			const userId = session.user.id;

			const { data: newProfile } = await supabase
				.from("profiles")
				.update({
					display_name: profile.displayName,
				})
				.eq("user_id", userId)
				.select("user_id, display_name")
				.single();

			if (!newProfile) throw new Error("Failed to update profile");

			mutate(
				(prev) => {
					if (!prev) return;

					return {
						...prev,
						id: newProfile.user_id,
						displayName: newProfile.display_name,
					};
				},
				{ revalidate: false },
			);
		},
		[mutate, session],
	);

	return {
		myProfile,
		error,
		isValidating,

		updateMyProfile,
	};
}

const CharacterSettingSchema = v.object({
	character: v.pipe(
		v.number(),
		v.minValue(0),
		v.maxValue(MODEL_LIST.length - 1),
		v.transform((x) => MODEL_LIST[x]),
	),
	costume: v.pipe(v.number(), v.minValue(0), v.maxValue(2)),
	accessory: v.pipe(
		v.number(),
		v.minValue(0),
		v.maxValue(ACCESSORY_LIST.length - 1),
		v.transform((x) => ACCESSORY_LIST[x]),
	),
	hair: v.pipe(v.string(), v.hexColor()),
});

function convertCharacterSetting(raw: Json): CharacterSetting {
	const result = v.parse(CharacterSettingSchema, raw);

	return result;
}

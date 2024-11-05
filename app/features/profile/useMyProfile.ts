import { useCallback } from "react";
import useSWR from "swr";
import * as v from "valibot";
import { ACCESSORY_LIST, MODEL_LIST } from "~/features/profile/Profile";
import type { CharacterSetting, Profile } from "~/features/profile/Profile";
import type { Json } from "~/libs/database";
import { supabase } from "~/libs/supabase";
import { useSession } from "../../hooks/useSession";

interface UseMyProfile {
	myProfile: Profile | null;
	error: unknown;
	isValidating: boolean;

	updateDisplayName: (displayName: string) => Promise<void>;
	updateCharacterSetting: (setting: CharacterSetting) => Promise<void>;
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

			const characterSetting = deserializeCharacterSetting(
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

	const updateDisplayName = useCallback(
		async (displayName: string) => {
			if (!session) throw new Error("Can't update profile without session");
			const userId = session.user.id;

			const mutation = async (
				prev: Profile | null | undefined,
			): Promise<Profile | undefined> => {
				const { data: newProfile } = await supabase
					.from("profiles")
					.update({
						display_name: displayName,
					})
					.eq("user_id", userId)
					.select("user_id, display_name")
					.single();

				if (!newProfile) throw new Error("Failed to update profile");

				if (!prev) return;
				return {
					...prev,
					id: newProfile.user_id,
					displayName: newProfile.display_name,
				};
			};

			mutate(mutation, { revalidate: false });
		},
		[mutate, session],
	);

	const updateCharacterSetting = useCallback(
		async (setting: CharacterSetting) => {
			if (!session) throw new Error("Can't update profile without session");
			const userId = session.user.id;

			const mutation = async (
				prev: Profile | null | undefined,
			): Promise<Profile | undefined> => {
				const { data: newProfile } = await supabase
					.from("profiles")
					.update({
						character_setting: serializeCharacterSetting(setting),
					})
					.eq("user_id", userId)
					.select("user_id, character_setting")
					.single();

				if (!newProfile) throw new Error("Failed to update profile");

				if (!prev) return;
				return {
					...prev,
					id: newProfile.user_id,
					characterSetting: deserializeCharacterSetting(
						newProfile.character_setting,
					),
				};
			};

			mutate(mutation, {
				optimisticData: (prev) => {
					if (!prev) return null;

					return {
						...prev,
						characterSetting: setting,
					};
				},
				revalidate: false,
			});
		},
		[mutate, session],
	);

	return {
		myProfile,
		error,
		isValidating,

		updateDisplayName,
		updateCharacterSetting,
	};
}

const DeserializeCharacterSettingSchema = v.object({
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

const SerializeCharacterSettingSchema = v.object({
	character: v.pipe(
		v.string(),
		v.transform((x) => (MODEL_LIST as unknown as string[]).indexOf(x)),
		v.minValue(0),
	),
	costume: v.pipe(v.number(), v.minValue(0), v.maxValue(2)),
	accessory: v.pipe(
		v.string(),
		v.transform((x) => (ACCESSORY_LIST as unknown as string[]).indexOf(x)),
		v.minValue(0),
	),
	hair: v.pipe(v.string(), v.hexColor()),
});

function deserializeCharacterSetting(raw: Json): CharacterSetting {
	const result = v.parse(DeserializeCharacterSettingSchema, raw);

	return result;
}

function serializeCharacterSetting(
	setting?: CharacterSetting,
): Json | undefined {
	if (!setting) return undefined;

	const result = v.parse(SerializeCharacterSettingSchema, setting);

	return result;
}

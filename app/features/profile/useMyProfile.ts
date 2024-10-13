import useSWR from "swr";
import { supabase } from "~/libs/supabase";
import type { Profile, UpdateProfileBody } from "~/features/profile/Profile";
import { useSession } from "../../hooks/useSession";
import { useCallback } from "react";

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
				.from("profiles")
				.select("user_id, display_name")
				.eq("user_id", userId)
				.limit(1)
				.single();

			if (!rawProfile) return null;

			return {
				id: rawProfile.user_id,
				displayName: rawProfile.display_name,
			};
		},
		{ suspense: true },
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
				{
					id: newProfile.user_id,
					displayName: newProfile.display_name,
				},
				{
					revalidate: false,
				},
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

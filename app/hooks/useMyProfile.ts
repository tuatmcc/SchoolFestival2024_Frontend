import useSWR, { type SWRResponse } from "swr";
import { supabase } from "~/libs/supabase";
import type { Profile } from "~/models/Profile";
import { useSession } from "./useSession";

export function useMyProfile(): SWRResponse<Profile | null> {
	const session = useSession();

	return useSWR(
		["/profile/me", session?.user.id],
		async ([_, id]) => {
			if (!id) return null;

			const { data } = await supabase
				.from("profiles")
				.select("id, display_name")
				.eq("id", id)
				.limit(1);

			if (!data) return null;
			const rawProfile = data[0];

			return {
				id: rawProfile.id,
				displayName: rawProfile.display_name,
			};
		},
		{ suspense: true },
	);
}

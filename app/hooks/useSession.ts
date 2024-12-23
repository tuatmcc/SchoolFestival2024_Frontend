import type { Session } from "@supabase/supabase-js";
import useSWRImmutable from "swr/immutable";
import useSWRSubscription from "swr/subscription";
import type { SWRSubscriptionOptions } from "swr/subscription";
import { supabase } from "~/libs/supabase";

export async function sessionFetcher() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return session;
}

export function useSession(): Session | null {
	const key = "session";
	const { data: initialSession } = useSWRImmutable(key, sessionFetcher, {
		suspense: true,
		fallbackData: null,
	});

	const { data: session } = useSWRSubscription(
		key,
		(_, { next }: SWRSubscriptionOptions<Session | null, unknown>) => {
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange((_event, session) => {
				next(null, session);
			});

			return subscription.unsubscribe;
		},
		{
			suspense: true,
			fallbackData: initialSession,
		},
	);

	return session ?? null;
}

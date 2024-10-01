import type { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export function getAccountCredentials(
	id: string,
): SignInWithPasswordCredentials {
	return {
		// supabase は userId のみでサインインできないため、強引にやる
		email: `email-${id}@example.com`,
		password: "password",
	};
}

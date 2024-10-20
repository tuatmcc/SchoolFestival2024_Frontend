import type { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components/Heading";
import { useMyProfile } from "~/features/profile/useMyProfile";
import { supabase } from "~/libs/supabase";
import { SignUp } from "./SignUp";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Page() {
	const { myProfile } = useMyProfile();

	const handleLogout = async () => {
		supabase.auth.signOut();
	};

	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>ホーム</Heading>
				{myProfile ? (
					<div className="grid justify-items-center gap-2">
						<div>ID: {myProfile.id}</div>
						<div>Display Name: {myProfile.displayName}</div>
						<div>Play Count: {myProfile.playCount}</div>
						<div>High Score: {myProfile.highScore ?? "-"}</div>
						<div>Rank: {myProfile.rank ?? "-"}</div>
						<button
							type="button"
							onClick={handleLogout}
							className="rounded-lg bg-pink-500 px-4 py-2 text-center font-bold text-white"
						>
							Logout
						</button>
					</div>
				) : (
					<SignUp />
				)}
			</main>
		</div>
	);
}

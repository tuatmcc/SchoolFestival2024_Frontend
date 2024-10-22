import type { MetaFunction } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { useMyProfile } from "~/features/profile/useMyProfile";
import { supabase } from "~/libs/supabase";
import { SignUp } from "./SignUp";

export const meta: MetaFunction = () => [{ title: "ホーム | RicoShot" }];

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
						<Button onClick={handleLogout}>Logout</Button>
					</div>
				) : (
					<SignUp />
				)}
			</main>
		</div>
	);
}

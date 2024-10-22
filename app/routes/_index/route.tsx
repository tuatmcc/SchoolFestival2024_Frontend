import type { MetaFunction } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { ProfileCard } from "~/components/ProfileCard";
import { useMyProfile } from "~/features/profile/useMyProfile";
import { SignUp } from "./SignUp";

export const meta: MetaFunction = () => [{ title: "ホーム | RicoShot" }];

export default function Page() {
	const { myProfile } = useMyProfile();

	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>ホーム</Heading>
				{myProfile ? (
					<ProfileCard className="rotate-2 sm:rotate-1" profile={myProfile} />
				) : (
					<SignUp />
				)}
			</main>
		</div>
	);
}

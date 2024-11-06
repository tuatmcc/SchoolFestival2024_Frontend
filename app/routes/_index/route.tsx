import type { MetaFunction } from "@remix-run/react";
import { Heading } from "~/components/Heading";
import { ProfileCard } from "~/components/ProfileCard";
import { RankingList } from "~/components/Ranking";
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
				{myProfile ? (
					<>
						<Heading>ホーム</Heading>
						<ProfileCard className="rotate-2 sm:rotate-1" profile={myProfile} />
					</>
				) : (
					<SignUp />
				)}
				<RankingList />
			</main>
		</div>
	);
}

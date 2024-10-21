import type { ReactNode } from "react";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { useMyProfile } from "~/features/profile/useMyProfile";
import { supabase } from "~/libs/supabase";

export default function Page(): ReactNode {
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
				<Heading>開発コンソール</Heading>
				<dl className="grid grid-cols-[auto_1fr] gap-x-4">
					<dt>ログイン状態</dt>
					<dd>{myProfile ? "ログイン中" : "未ログイン"}</dd>
					{myProfile && (
						<>
							<dt>ID</dt>
							<dd>{myProfile.id}</dd>
							<dt>名前</dt>
							<dd>{myProfile.displayName}</dd>
							<dt>順位</dt>
							<dd>{myProfile.rank ?? "(未プレイ)"}位</dd>
							<dt>ハイスコア</dt>
							<dd>{myProfile.highScore ?? "(未プレイ)"}点</dd>
							<dt>プレイ回数</dt>
							<dd>{myProfile.playCount}回</dd>
						</>
					)}
				</dl>
				{myProfile && (
					<Button className="mx-auto" onClick={handleLogout}>
						ログアウト
					</Button>
				)}
			</main>
		</div>
	);
}

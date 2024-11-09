import { Link } from "@remix-run/react";
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

	const handleLoginGuest = async (idx: number) => {
		await supabase.auth.signInWithPassword({
			email: `guest${idx}@example.com`,
			password: "guest",
		});
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
				<div className="mx-auto grid gap-2">
					<Link to="/" className="rounded bg-zinc-600 p-2 text-center">
						ホームへ
					</Link>
					{[1, 2, 3, 4].map((idx) => (
						<button
							key={idx}
							type="button"
							className="rounded bg-zinc-600 p-2 text-center"
							onClick={() => handleLoginGuest(idx)}
						>
							ゲスト{idx}でログイン
						</button>
					))}
				</div>
			</main>
		</div>
	);
}

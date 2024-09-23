import type { MetaFunction } from "@remix-run/node";
import { useSession } from "~/hooks/useSession";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	const session = useSession();

	// 未サインインの場合
	if (!session)
		return (
			<main className="grid h-dvh w-dvw grid-rows-2">
				<h1 className="p-4 text-center text-4xl">Game</h1>
				<div className="mx-auto flex max-w-96 flex-col gap-2 p-4">
					<a
						href="/signup"
						type="button"
						className="rounded-lg bg-pink-500 px-4 py-2 text-center font-bold text-white"
					>
						匿名で登録
					</a>
				</div>
			</main>
		);

	// サインイン済みの場合
	return (
		<main className="grid h-dvh w-dvw grid-rows-2">
			<h1 className="p-4 text-center text-4xl">Game</h1>
			<div className="mx-auto flex max-w-96 flex-col gap-2 p-4">
				Hello World
			</div>
			<div className="mx-auto flex max-w-96 flex-col gap-2 p-4">
				ID: {session.user.email?.replace("@example.com", "")}
			</div>
		</main>
	);
}

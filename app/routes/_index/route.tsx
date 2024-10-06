import type { MetaFunction } from "@remix-run/node";
import { useSession } from "~/hooks/useSession";
import { supabase } from "~/libs/supabase";
import { SignUp } from "./SignUp";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Page() {
	const session = useSession();

	const handleLogout = async () => {
		supabase.auth.signOut();
	};

	return (
		<main className="grid h-dvh w-dvw grid-rows-2">
			<h1 className="p-4 text-center text-4xl">Game</h1>
			<div className="mx-auto flex max-w-96 flex-col gap-2 p-4">
				{session ? (
					<div className="grid justify-items-center gap-2">
						<div>ID: {session.user.id}</div>
						<div>Display Name: {session.user.user_metadata.display_name}</div>
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
			</div>
		</main>
	);
}

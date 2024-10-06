import { useNavigate } from "@remix-run/react";
import { v4 } from "uuid";
import { getAccountCredentials } from "~/libs/getAccountCredentials";
import { supabase } from "~/libs/supabase";

export default function Signup() {
	const navigate = useNavigate();

	const handleSignIn = async () => {
		const { error } = await supabase.auth.signInAnonymously({
			options: {
				data: {
					display_name: "名無し",
				},
			},
		});

		if (error) {
			console.error("Error signing up:", error.message);
			return;
		}

		navigate("/");
	};
	return (
		<main className="grid h-dvh w-dvw grid-rows-2">
			<h1 className="p-4 text-center text-4xl">Game</h1>
			<div className="mx-auto flex max-w-96 flex-col gap-2 p-4">
				<button
					type="button"
					className="rounded-lg bg-pink-500 px-4 py-2 text-center font-bold text-white"
					onClick={handleSignIn}
				>
					匿名で登録
				</button>
			</div>
		</main>
	);
}

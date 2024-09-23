import { useNavigate } from "@remix-run/react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { getAccountCredentials } from "~/libs/getAccountCredentials";
import { supabase } from "~/libs/supabase";

type FormValues = {
	id: string;
};

export default function Signin(): ReactNode {
	// ID でサインイン、デバッグ用(そもそもログアウトは想定していない)
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: "onBlur",
	});

	const onSubmit = async ({ id }: FormValues) => {
		const { error } = await supabase.auth.signInWithPassword(
			getAccountCredentials(id),
		);

		if (error) {
			console.error(error);
			return;
		}

		navigate("/");
	};

	return (
		<main>
			<h1 className="p-4 text-center text-4xl">Game</h1>
			<h2 className="p-4 text-center text-2xl">ID でサインイン</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="rounded-lg bg-gray-100 px-4 py-2 text-center font-bold outline-pink-500"
					placeholder="ID"
					{...register("id")}
				/>
			</form>
			<button
				type="submit"
				className="rounded-lg bg-pink-500 px-4 py-2 text-center font-bold text-white"
			>
				サインイン
			</button>
		</main>
	);
}

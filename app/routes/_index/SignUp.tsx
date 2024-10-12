import type { ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "~/libs/supabase";

interface FormData {
	displayName: string;
}

export function SignUp(): ReactNode {
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		// 状態に関わらずログアウトする
		await supabase.auth.signOut();

		await supabase.auth.signInAnonymously({
			options: {
				data: {
					display_name: data.displayName,
				},
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid justify-items-center gap-2"
		>
			<input
				type="text"
				className="rounded-lg border border-gray-300 px-4 py-2"
				placeholder="名前"
				{...register("displayName")}
			/>
			<button
				type="submit"
				className="rounded-lg bg-pink-500 px-4 py-2 text-center font-bold text-white"
			>
				登録
			</button>
		</form>
	);
}

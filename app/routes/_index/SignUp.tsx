import type { ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
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
			className="grid justify-items-center gap-4"
		>
			<Input placeholder="名前" {...register("displayName")} />
			<Button type="submit">登録</Button>
		</form>
	);
}

import type { ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LogginCard } from "~/components/LogginCard";
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
			className="grid justify-items-center gap-8"
		>
			<img src="../../public/logo.svg" alt="RicoShot" className="w-full" />
			<LogginCard className="w-full rotate-2" />
		</form>
	);
}

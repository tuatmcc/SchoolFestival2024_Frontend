import { valibotResolver } from "@hookform/resolvers/valibot";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	type UpdateDisplayNameFormData,
	UpdateDisplayNameSchema,
} from "~/features/profile/Profile";
import { supabase } from "~/libs/supabase";
import { cn } from "~/libs/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

interface LoginCardProps extends ComponentPropsWithRef<"div"> {}

export function LoginCard({ className }: LoginCardProps): ReactNode {
	const { register, formState, handleSubmit } =
		useForm<UpdateDisplayNameFormData>({
			resolver: valibotResolver(UpdateDisplayNameSchema),
		});

	const onSubmit: SubmitHandler<UpdateDisplayNameFormData> = async (data) => {
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
		<Card className={cn("grid gap-y-4 p-4", className)} asChild>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className={"text-center text-2xl drop-shadow-base"}>
					名前を入力して登録！
				</h1>
				<div className="grid gap-y-1">
					<Input placeholder="名前" {...register("displayName")} />
					{formState.errors.displayName && (
						<span className="ml-2 text-red-500 drop-shadow-base">
							{formState.errors.displayName.message}
						</span>
					)}
				</div>
				<Button type="submit" className="justify-self-center">
					登録
				</Button>
			</form>
		</Card>
	);
}

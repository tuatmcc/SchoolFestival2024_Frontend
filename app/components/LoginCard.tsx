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
	const { register, handleSubmit } = useForm<UpdateDisplayNameFormData>({
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
		<Card
			className={cn("flex flex-col items-center gap-y-4 p-4", className)}
			asChild
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className={"text-2xl drop-shadow-base"}>名前を入力して登録！</h1>
				<Input placeholder="名前" {...register("displayName")} />
				<Button type="submit">登録</Button>
			</form>
		</Card>
	);
}

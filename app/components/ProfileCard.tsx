import { valibotResolver } from "@hookform/resolvers/valibot";
import * as Dialog from "@radix-ui/react-dialog";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import {
	type Profile,
	type UpdateDisplayNameFormData,
	UpdateDisplayNameSchema,
} from "~/features/profile/Profile";
import { useMyProfile } from "~/features/profile/useMyProfile";
import { cn } from "~/libs/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

export interface ProfileCardProps {
	profile: Profile;
	className?: string;
}

export function ProfileCard({ profile, className }: ProfileCardProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Card className={cn("grid w-full max-w-screen-sm gap-4 p-4", className)}>
				<div className="flex min-w-0 items-center justify-between gap-4 px-2">
					<span className="truncate text-2xl drop-shadow-base">
						{profile.displayName}
					</span>
					<Dialog.Trigger asChild>
						<Button className="flex-shrink-0">編集</Button>
					</Dialog.Trigger>
				</div>
				<div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center drop-shadow-base">
					<div className="grid justify-items-center gap-1 text-center">
						<span>順位</span>
						<span className="text-2xl">
							{profile.rank ? `${profile.rank}位` : "-"}
						</span>
					</div>
					<hr className="h-2/3 w-0 rounded-full border-2 border-white" />
					<div className="grid justify-items-center gap-1 text-center">
						<span>ハイスコア</span>
						<span className="text-2xl">
							{profile.highScore ? profile.highScore : "-"}
						</span>
					</div>
					<hr className="h-2/3 w-0 rounded-full border-2 border-white" />
					<div className="grid justify-items-center gap-1 text-center">
						<span>プレイ回数</span>
						<span className="text-2xl">{profile.playCount}回</span>
					</div>
				</div>
			</Card>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 grid place-items-center bg-black/50 px-4">
					<EditModal profile={profile} setOpen={setOpen} />
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

interface EditModalProps {
	profile: Profile;
	setOpen: (open: boolean) => void;
}
function EditModal({ profile, setOpen }: EditModalProps): ReactNode {
	const { updateDisplayName } = useMyProfile();
	const { register, formState, handleSubmit, reset } =
		useForm<UpdateDisplayNameFormData>({
			resolver: valibotResolver(UpdateDisplayNameSchema),
			defaultValues: {
				displayName: profile.displayName,
			},
		});

	const onSubmit = async (data: UpdateDisplayNameFormData) => {
		try {
			await updateDisplayName(data.displayName);
			reset();
		} finally {
			setOpen(false);
		}
	};

	return (
		<Dialog.Content
			asChild
			// XXX: Enterを押すとダイアログが閉じてしまい、フォームが送信されないため、Enterを無効化
			// ただし、フォームも送信されなくなってしまう。
			onKeyDown={(e) => {
				e.key === "Enter" && e.preventDefault();
			}}
		>
			<Card asChild>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="-rotate-2 grid w-full max-w-screen-sm gap-y-4 p-4 sm:gap-y-8"
				>
					<Dialog.Title className="text-center text-2xl drop-shadow-base">
						名前の編集
					</Dialog.Title>
					<div className="grid gap-y-1">
						<Input placeholder="名前" {...register("displayName")} />
						{formState.errors.displayName && (
							<span className="ml-2 text-red-500 drop-shadow-base">
								{formState.errors.displayName.message}
							</span>
						)}
					</div>
					<div className="mt-2 grid grid-cols-2 justify-items-center gap-x-8">
						<Button
							className="w-full max-w-32"
							foreground={false}
							onClick={() => setOpen(false)}
						>
							キャンセル
						</Button>
						<Button type="submit" className="w-full max-w-32">
							決定
						</Button>
					</div>
				</form>
			</Card>
		</Dialog.Content>
	);
}

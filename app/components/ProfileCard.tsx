import * as Dialog from "@radix-ui/react-dialog";
import type { Profile } from "~/features/profile/Profile";
import { cn } from "~/libs/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

export interface ProfileCardProps {
	profile: Profile;
	onClickEdit?: () => void;
	className?: string;
}

export function ProfileCard({
	profile,
	onClickEdit,
	className,
}: ProfileCardProps) {
	return (
		<Dialog.Root>
			<Card className={cn("grid w-full max-w-screen-sm gap-4 p-4", className)}>
				<div className="flex min-w-0 items-center justify-between gap-4 px-2">
					<span className="truncate text-2xl drop-shadow-base">
						{profile.displayName}
					</span>
					<Dialog.Trigger asChild>
						<Button className="flex-shrink-0" onClick={onClickEdit}>
							編集
						</Button>
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
					<Dialog.Content asChild>
						<Card className="-rotate-2 grid w-full max-w-screen-sm gap-y-4 p-4 sm:gap-y-8">
							<Dialog.Title className="text-center text-2xl drop-shadow-base">
								名前の編集
							</Dialog.Title>
							<Input placeholder="名前" />
							<div className="mt-2 grid grid-cols-2 justify-items-center gap-x-8 px-4">
								<Button className="w-full max-w-32" foreground={false}>
									キャンセル
								</Button>
								<Button className="w-full max-w-32">決定</Button>
							</div>
						</Card>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

import type { Profile } from "~/features/profile/Profile";
import { cn } from "~/libs/utils";
import { Button } from "./Button";
import { Card } from "./Card";

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
		<Card className={cn("grid w-full max-w-screen-sm gap-4 p-4", className)}>
			<div className="flex min-w-0 items-center justify-between gap-4 px-2">
				<span className="truncate text-2xl drop-shadow-base">
					{profile.displayName}
				</span>
				<Button className="flex-shrink-0" onClick={onClickEdit}>
					編集
				</Button>
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
	);
}

import type { MetaFunction } from "@remix-run/react";
import { Heading } from "~/components/Heading";
import { QRCode } from "~/components/QRCode";
import { useSession } from "~/hooks/useSession";

export const meta: MetaFunction = () => [{ title: "遊ぶ | RicoShot" }];

export default function Page() {
	const session = useSession();

	if (!session) return null;
	return (
		<div
			className="h-dvh w-full overflow-hidden p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid h-full w-full max-w-screen-sm grid-rows-[auto_auto_1fr] gap-y-4">
				<Heading>遊ぶ</Heading>
				<div className="grid justify-items-center gap-y-1">
					<QRCode
						value={session.user.id}
						className="aspect-square h-auto w-full max-w-96"
					/>
					<span className="text-center text-lg drop-shadow-base">
						{session.user.id}
					</span>
				</div>
				<div className="grid place-items-center pb-16">
					<p className="text-center drop-shadow-base">
						プレイする際には上記のQRコードを
						<br />
						ゲーム筐体にかざして読み取ってください
					</p>
				</div>
			</main>
		</div>
	);
}

import type { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components/Heading";
import { QRCode } from "~/components/QRCode";
import { useSession } from "~/hooks/useSession";

export const meta: MetaFunction = () => {
	return [{ title: "QR Code" }, { name: "description", content: "qr code" }];
};

export default function Page() {
	const session = useSession();

	if (!session) return null;
	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
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
			</main>
		</div>
	);
}

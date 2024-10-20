import type { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components/Heading";
import QRCode from "~/components/qrcode";
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
					<QRCode url={session.user.id} size={512} />
					<span className="drop-shadow-base">ID: {session.user.id}</span>
				</div>
			</main>
		</div>
	);
}

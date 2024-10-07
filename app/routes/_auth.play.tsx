import type { MetaFunction } from "@remix-run/node";
import { useSession } from "~/hooks/useSession";
import QRCode from "~/components/qrcode";

export const meta: MetaFunction = () => {
	return [{ title: "QR Code" }, { name: "description", content: "qr code" }];
};

export default function Page() {
	const session = useSession();

	if(!session) return null
	return (
		<div className="p-4 font-sans">
			<h1 className="text-3xl">QR code</h1>
			<ul className="mt-4 list-disc space-y-2 pl-6">
				<QRCode url={session.user.id} size={512} />
				<div>ID: {session.user.id}</div>
			</ul>
		</div>
	);
}

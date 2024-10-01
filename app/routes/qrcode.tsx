import type { MetaFunction } from "@remix-run/node";
import QRCode from "~/components/qrcode";

export const meta: MetaFunction = () => {
	return [{ title: "QR Code" }, { name: "description", content: "qr code" }];
};

export default function Index() {
	return (
		<div className="p-4 font-sans">
			<h1 className="text-3xl">QR code</h1>
			<ul className="mt-4 list-disc space-y-2 pl-6">
				<QRCode url="https://www.tuatmcc.com/" size={512} />
			</ul>
		</div>
	);
}

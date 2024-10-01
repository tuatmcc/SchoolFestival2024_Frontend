import type { MetaFunction } from "@remix-run/node";
import QRCode from '~/components/qrcode';

export const meta: MetaFunction = () => {
	return [
		{ title: "QR Code" },
		{ name: "description", content: "qr code" },
	];
};

export default function Index() {
	return (
		<div className="font-sans p-4">
			<h1 className="text-3xl">QR code</h1>
			<ul className="list-disc mt-4 pl-6 space-y-2">
                <QRCode url="https://www.tuatmcc.com/" size={512}/>
			</ul>
		</div>
	);
}


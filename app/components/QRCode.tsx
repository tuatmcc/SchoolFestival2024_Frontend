import { QRCodeSVG } from "qrcode.react";
import type { ReactNode } from "react";

export interface QRCodeProps {
	value: string;
	className?: string;
}

export function QRCode({ value, className }: QRCodeProps): ReactNode {
	return (
		<QRCodeSVG value={value} marginSize={4} level="M" className={className} />
	);
}

import { Partytown } from "@builder.io/partytown/react";
import type { ReactNode } from "react";

export interface Props {
	googleAnalyticsId: string;
}

export function Analytics({ googleAnalyticsId }: Props): ReactNode {
	return (
		<>
			<Partytown debug={import.meta.env.DEV} forward={["dataLayer.push"]} />
			<script
				async
				type="text/partytown"
				src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
			/>
			<script
				type="text/partytown"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the Google Analytics ID is a build-time constant
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer||=[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAnalyticsId}')`,
				}}
			/>
		</>
	);
}

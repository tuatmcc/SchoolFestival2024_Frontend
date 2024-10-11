import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { Partytown } from "@builder.io/partytown/react";
import { Suspense } from "react";
import backgroundUrl from "~/assets/background.svg";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Partytown debug forward={["dataLayer.push"]} />
				{import.meta.env.VITE_GOOGLE_ANALYTICS_ID && (
					<>
						<script
							async
							type="text/partytown"
							src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`}
						/>
						<script
							type="text/partytown"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the Google Analytics ID is a build-time constant
							dangerouslySetInnerHTML={{
								__html: `window.dataLayer||=[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}')`,
							}}
						/>
					</>
				)}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<Meta />
				<Links />
				<link
					href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap&text=ただいま準備中"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body
				className="animate-bg-slide bg-repeat font-dela text-white"
				style={{
					backgroundImage: `url("${backgroundUrl}")`,
					backgroundSize: "64px",
				}}
			>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Suspense fallback={null}>
			<Outlet />
		</Suspense>
	);
}

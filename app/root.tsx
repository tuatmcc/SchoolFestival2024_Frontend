import "./tailwind.css";

import { Partytown } from "@builder.io/partytown/react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import { cva } from "class-variance-authority";

const appVariants = cva(
	"font-dela-gothic bg-size-app w-full min-h-dvh text-white",
	{
		variants: {
			variant: {
				pink: "bg-app-pink bg-pink-400",
				cyan: "bg-app-cyan bg-cyan-400",
				emerald: "bg-app-emerald bg-emerald-400",
				yellow: "bg-app-yellow bg-yellow-400",
			},
		},
		defaultVariants: {
			variant: "pink",
		},
	},
);

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
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
				<link
					href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
			</head>
			<body className={appVariants()}>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Outlet />
		</Suspense>
	);
}

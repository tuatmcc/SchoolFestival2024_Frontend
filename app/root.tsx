import "./tailwind.css";

import { Partytown } from "@builder.io/partytown/react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "@remix-run/react";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import { cva } from "class-variance-authority";
import { ThemeProvider } from "./components/Theme";
import { Background } from "./components/Background";

export const appThemes = cva(
	"font-dela-gothic antialiased bg-size-app w-full min-h-dvh text-white relative",
);

const PATH_THEME_MAP: Record<string, "pink" | "cyan" | "emerald" | "yellow"> = {
	"/": "pink",
	"/edit": "cyan",
	"/play": "emerald",
	"/guide": "yellow",
};

export function Layout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const theme = PATH_THEME_MAP[location.pathname] ?? "pink";

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
			<body className={appThemes()}>
				<ThemeProvider theme={theme}>
					<Background />
					{children}
				</ThemeProvider>
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

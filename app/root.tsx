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
import { cva } from "class-variance-authority";
import { Suspense } from "react";
import { Background } from "./components/Background";
import { BottomNav } from "./components/BottomNav";
import { Loading } from "./components/Loading";
import { ThemeProvider } from "./components/Theme";
import { useMyProfile } from "./features/profile/useMyProfile";
import { cn } from "./libs/utils";

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
	const { myProfile } = useMyProfile();

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
					<div
						className={cn(
							"fixed inset-x-0 bottom-0 translate-y-full px-2 pt-2 pb-3 transition-transform duration-300 ease-out",
							myProfile && "translate-y-0",
						)}
					>
						<BottomNav path={location.pathname} className="mx-auto" />
					</div>
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

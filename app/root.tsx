import "./tailwind.css";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useRouteError,
} from "@remix-run/react";
import { cva } from "class-variance-authority";
import { type ReactNode, Suspense } from "react";
import { Analytics } from "./components/Analytics";
import { Background } from "./components/Background";
import { BottomNav } from "./components/BottomNav";
import { Button } from "./components/Button";
import { Patterns } from "./components/Patterns";
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

	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="RicoShotはマルチプレイ対応の対戦シューティングゲームです。好きなキャラを選択、カスタマイズしてハイスコアを目指しましょう!"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				{import.meta.env.VITE_GOOGLE_ANALYTICS_ID && (
					<Analytics
						googleAnalyticsId={import.meta.env.VITE_GOOGLE_ANALYTICS_ID}
					/>
				)}
				<link
					href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body className={appThemes()}>
				<ThemeProvider theme={theme}>
					<Patterns />
					<Background />
					{children}
					<Suspense fallback={null}>
						<Nav path={location.pathname} />
					</Suspense>
				</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

interface NavProps {
	path: string;
}
function Nav({ path }: NavProps): ReactNode {
	const { myProfile } = useMyProfile();

	return (
		<div
			className={cn(
				"fixed inset-x-0 bottom-0 translate-y-full px-2 pt-2 pb-3 transition-transform delay-300 duration-300 ease-out",
				myProfile && "translate-y-0",
			)}
			style={{ viewTransitionName: "bottom-nav" }}
		>
			<BottomNav path={path} className="mx-auto" />
		</div>
	);
}

export default function App() {
	return <Outlet />;
}

export function HydrateFallback(): ReactNode {
	return (
		<div className="grid h-dvh w-full place-items-center drop-shadow-md">
			<div className="aspect-square h-24 animate-spin rounded-full border-8 border-white border-t-transparent duration-500" />
		</div>
	);
}

export function ErrorBoundary(): ReactNode {
	const error = useRouteError();

	try {
		console.log(error);
		// @ts-expect-error
		window.gtag("event", "exception", {
			// @ts-expect-error
			description: error?.message,
			fatal: true,
		});
	} catch {}

	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="RicoShotはマルチプレイ対応の対戦シューティングゲームです。好きなキャラを選択、カスタマイズしてハイスコアを目指しましょう!"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				{import.meta.env.VITE_GOOGLE_ANALYTICS_ID && (
					<Analytics
						googleAnalyticsId={import.meta.env.VITE_GOOGLE_ANALYTICS_ID}
					/>
				)}
				<link
					href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body className={appThemes()}>
				<ThemeProvider theme="yellow">
					<Patterns />
					<Background />
					<div className="grid min-h-dvh w-full place-items-center p-4">
						<div className="flex flex-col items-center gap-4">
							<p className="text-balance text-center text-lg text-red-500 drop-shadow-base">
								エラーが発生しました。リロードしてください。
							</p>
							<Button
								onClick={() => {
									window.location.reload();
								}}
							>
								リロード
							</Button>
						</div>
					</div>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}

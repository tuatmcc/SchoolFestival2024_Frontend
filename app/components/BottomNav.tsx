import { useId, type ReactNode } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const LINKS = [
	{
		href: "/",
		label: "ホーム",
	},
	{
		href: "/edit",
		label: "キャラ編集",
	},
	{
		href: "/play",
		label: "遊ぶ",
	},
	{
		href: "/guide",
		label: "遊び方",
	},
];

export function BottomNav(): ReactNode {
	return (
		<NavigationMenu.Root className="relative w-full max-w-screen-sm">
			<Background />
			<NavigationMenu.List className="grid grid-flow-col px-4">
				{LINKS.map((link) => (
					<NavigationMenu.Item key={link.href}>
						<NavigationMenu.Link
							active={link.href === "/"}
							href={link.href}
							className="block w-full py-3 text-center drop-shadow-base"
						>
							{link.label}
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}

function Background(): ReactNode {
	const id = useId();

	return (
		<svg
			viewBox="0 0 382 45"
			preserveAspectRatio="none"
			role="presentation"
			className="absolute inset-0 h-full w-full drop-shadow-lg"
		>
			<defs>
				<pattern
					id={id}
					width="18"
					height="36"
					patternTransform="scale(.2)"
					patternUnits="userSpaceOnUse"
				>
					<rect width="18" height="36" className="fill-zinc-600" />
					<g className="fill-zinc-700/75">
						<path d="M1,3h6l-3,6L1,3ZM10,21h6l-3,6-3-6Z" />
						<path d="M1,3h6l-3,6L1,3ZM10,21h6l-3,6-3-6Z" />
					</g>
				</pattern>
			</defs>
			<polygon
				points="17.92 0 382 7.02 368.32 40 0 45 17.92 0"
				style={{ fill: `url(#${id})` }}
			/>
		</svg>
	);
}

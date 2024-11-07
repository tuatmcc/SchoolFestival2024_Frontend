import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { cn } from "~/libs/utils";
import { BUTTON_BG_PATTERN_ID, BUTTON_FG_PATTERN_ID } from "./Patterns";

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
	// {
	// 	href: "/guide",
	// 	label: "遊び方",
	// },
];

export interface BottomNavProps {
	path: string;
	className?: string;
}

export function BottomNav({ path, className }: BottomNavProps): ReactNode {
	const index = LINKS.findIndex((link) => link.href === path);

	return (
		<NavigationMenu.Root
			className={cn("relative w-full max-w-screen-sm", className)}
		>
			<Background />
			<div className="relative px-4">
				<Selected length={LINKS.length} index={index} />
				<NavigationMenu.List className="grid auto-cols-fr grid-flow-col">
					{LINKS.map((link) => (
						<NavigationMenu.Item key={link.href}>
							<NavigationMenu.Link
								active={link.href === path}
								asChild
								className={cn(
									"block w-full py-3 text-center drop-shadow-base transition-transform md:text-xl",
									link.href === path && "-translate-y-1 -rotate-2",
								)}
							>
								<Link to={link.href} viewTransition>
									{link.label}
								</Link>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					))}
				</NavigationMenu.List>
			</div>
		</NavigationMenu.Root>
	);
}

function Background(): ReactNode {
	return (
		<svg
			viewBox="0 0 382 45"
			preserveAspectRatio="none"
			role="presentation"
			className="absolute inset-0 h-full w-full drop-shadow-lg"
		>
			<polygon
				points="17.92 0 382 7.02 368.32 40 0 45 17.92 0"
				fill={`url(#${BUTTON_BG_PATTERN_ID})`}
			/>
		</svg>
	);
}

interface SelectedProps {
	length: number;
	index: number;
}

function Selected({ length, index }: SelectedProps): ReactNode {
	return (
		<div className="absolute inset-x-4 inset-y-0">
			<div
				className={cn(
					"-top-1 absolute bottom-0 left-0 p-1 transition-transform duration-200 ease-in-backward md:px-4",
					index === -1 && "hidden",
				)}
				style={{
					width: `${100 / length}%`,
					transform: `translateX(${100 * index}%)`,
				}}
			>
				<svg
					width="100%"
					height="100%"
					role="presentation"
					className="md:-skew-y-3 -skew-y-6 skew-x-12 border-2 border-white drop-shadow-md"
				>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						fill={`url(#${BUTTON_FG_PATTERN_ID})`}
					/>
				</svg>
			</div>
		</div>
	);
}

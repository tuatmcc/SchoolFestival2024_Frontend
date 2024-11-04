import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { cn } from "~/libs/utils";
import { BACKGROUND_PATTERN_ID, BUTTON_BG_PATTERN_ID } from "./Patterns";

const LINKS = [
	{
		href: "/clothes",
		label: "服装",
	},
	{
		href: "/hair",
		label: "髪型",
	},
	{
		href: "/hairColor",
		label: "髪色",
	},
];

export interface TabBarProps {
	path: string;
	className?: string;
}

export function TabBar({ path, className }: TabBarProps): ReactNode {
	const index = LINKS.findIndex((link) => link.href === path);

	return (
		<NavigationMenu.Root
			className={cn("relative w-full max-w-screen-sm", className)}
		>
			<Background />
			<div>
				<Selected length={LINKS.length} index={index} />
				<NavigationMenu.List className="grid auto-cols-fr grid-flow-col">
					{LINKS.map((link) => (
						<NavigationMenu.Item key={link.href}>
							<NavigationMenu.Link
								active={link.href === path}
								asChild
								className={cn(
									"block w-full py-3 text-center drop-shadow-base transition-transform md:text-xl",
									link.href === path,
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
			viewBox="0 0 497 197"
			preserveAspectRatio="none"
			role="presentation"
			className="absolute inset-0 h-full w-full drop-shadow-lg"
		>
			<rect
				x="0"
				y="20"
				width="100%"
				height="100%"
				rx="2%"
				ry="20%"
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
		<div>
			<div
				className={cn(
					"absolute left-0 transition-transform duration-200 ease-in-backward md:inset-y-0",
					index === -1 && "hidden",
				)}
				style={{
					width: `${100 / length}%`,
					transform: `translateX(${100 * index}%)`,
				}}
			>
				<svg width="100%" height="100%" role="presentation" className="">
					<rect
						x="0"
						y="5"
						width="100%"
						height="100%"
						rx="5%"
						fill={`url(#${BACKGROUND_PATTERN_ID})`}
					/>
				</svg>
			</div>
		</div>
	);
}

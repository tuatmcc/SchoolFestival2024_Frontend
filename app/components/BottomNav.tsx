import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link } from "@remix-run/react";
import { cva } from "class-variance-authority";
import { type ReactNode, useId } from "react";
import { cn } from "~/libs/utils";
import { useTheme } from "./Theme";

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
				fill={`url(#${id})`}
			/>
		</svg>
	);
}

const patternBgVariant = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-400",
			cyan: "fill-cyan-400",
			emerald: "fill-emerald-400",
			yellow: "fill-yellow-400",
		},
	},
});

const patternFgVariant = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-500/50",
			cyan: "fill-cyan-500/50",
			emerald: "fill-emerald-500/50",
			yellow: "fill-yellow-500/50",
		},
	},
});

interface SelectedProps {
	length: number;
	index: number;
}

function Selected({ length, index }: SelectedProps): ReactNode {
	const id = useId();
	const theme = useTheme();

	return (
		<div className="absolute inset-x-4 inset-y-0">
			<div
				className="-top-0.5 md:-top-1 absolute inset-y-1 left-0 transition-transform duration-200 ease-in-backward md:inset-y-0"
				style={{
					width: `${100 / length}%`,
					transform: `translateX(${100 * index}%)`,
				}}
			>
				<svg
					width="100%"
					height="100%"
					role="presentation"
					className="md:-skew-y-3 -skew-y-6 skew-x-12 p-1 drop-shadow-md md:px-4"
				>
					<defs>
						<pattern
							id={id}
							width="32"
							height="32"
							patternTransform="scale(0.3)"
							patternUnits="userSpaceOnUse"
						>
							<rect
								width="32"
								height="32"
								className={patternBgVariant({ theme })}
							/>
							<path
								d="M20 20c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4ZM4 4c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4Zm4 3.2c1.77 0 3.2-1.43 3.2-3.2S9.77.8 8 .8 4.8 2.23 4.8 4 6.23 7.2 8 7.2Zm16 16c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2 1.43 3.2 3.2 3.2Z"
								className={patternFgVariant({ theme })}
							/>
						</pattern>
					</defs>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						fill={`url(#${id})`}
						className="stroke-white"
						strokeWidth="5"
					/>
				</svg>
			</div>
		</div>
	);
}

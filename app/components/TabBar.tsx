import * as Tabs from "@radix-ui/react-tabs";
import { Link } from "@remix-run/react";
import { cn } from "~/libs/utils";

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

export function TabBar({ path, className }: TabBarProps) {
	const index = LINKS.findIndex((link) => link.href === path);

	return (
		<Tabs.Root
			value={LINKS[index].href}
			className={cn(
				"relative w-full max-w-screen-sm overflow-hidden bg-gray-600",
				className,
			)}
			style={{ borderRadius: "10px 10px 0 0" }}
		>
			<Tabs.List className="flex">
				{LINKS.map((link) => (
					<Tabs.Trigger
						key={link.href}
						value={link.href}
						className={cn(
							"flex-1 bg-gray-600 py-3 text-center text-white transition-transform md:text-xl",
							{ "bg-cyan-400": link.href === path },
						)}
						style={{ borderRadius: path === link.href ? "10px 10px 0 0" : "0" }}
					>
						<Link to={link.href} viewTransition>
							{link.label}
						</Link>
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</Tabs.Root>
	);
}

import * as Tabs from "@radix-ui/react-tabs";
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
				"relative w-full max-w-screen-sm rounded-t-lg overflow-hidden bg-gray-600",
				className,
			)}
		>
			<Tabs.List className="flex">
				{LINKS.map((link) => (
					<Tabs.Trigger
						key={link.href}
						value={link.href}
						className={cn(
							"flex-1 py-3 text-center text-white md:text-xl rounded-t-lg",
							{ "bg-cyan-400": link.href === path },
						)}
					>
						{link.label}
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</Tabs.Root>
	);
}

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "~/libs/utils";

const TAB_LIST = [
	{
		value: "costume",
		label: "服装",
	},
	{
		value: "accessory",
		label: "装飾",
	},
	{
		value: "hair",
		label: "髪色",
	},
];

export interface TabBarProps {
	className?: string;
}

export function TabBar({ className }: TabBarProps) {
	return (
		<div
			className={cn(
				"relative w-full max-w-screen-sm overflow-hidden rounded-t-lg bg-gray-600",
				className,
			)}
		>
			<Tabs.List className="flex">
				{TAB_LIST.map(({ value, label }) => (
					<Tabs.Trigger
						key={value}
						value={value}
						className={cn(
							'flex-grow rounded-t-lg py-2 text-center data-[state="active"]:bg-cyan-400 data-[state="active"]:drop-shadow-tab md:text-xl',
						)}
					>
						<span className="drop-shadow-base">{label}</span>
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</div>
	);
}

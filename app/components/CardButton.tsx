import type { ReactNode } from "react";
import { cn } from "~/libs/utils";

export interface CardButtonProps {
	value: string;
	name: string;
	checked?: boolean;
	onChange?: (value: string) => void;
}

export function CardButton({
	value,
	name,
	checked,
	onChange,
}: CardButtonProps): ReactNode {
	return (
		<label className="aspect-square drop-shadow-lg">
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={() => onChange?.(value)}
				className="sr-only"
			/>
			<div
				className={cn(
					"rotate-3 border-4 border-transparent",
					checked && "border-orange-400",
				)}
			>
				<img
					src={"https://placehold.jp/100x100.png"}
					alt=""
					className="border-4 border-white bg-zinc-400"
				/>
			</div>
		</label>
	);
}

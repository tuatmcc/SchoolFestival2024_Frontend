import type { ReactNode } from "react";
import { cn } from "~/libs/utils";

export interface CardButtonProps {
	value: string;
	name: string;
	checked?: boolean;
	onChange?: (value: string) => void;
	src?: string;
	color?: string;
}

export function CardButton({
	value,
	name,
	checked,
	onChange,
	src,
	color,
}: CardButtonProps): ReactNode {
	return (
		<label className="drop-shadow-lg">
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
					src={src}
					alt=""
					className="aspect-square w-full border-4 border-white bg-zinc-400"
					style={{ backgroundColor: color }}
				/>
			</div>
		</label>
	);
}

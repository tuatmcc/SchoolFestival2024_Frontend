import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "~/libs/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				className={cn(
					"w-full rounded-lg border-2 border-gray-300 bg-zinc-600 px-4 py-2 shadow-lg [text-shadow:theme(boxShadow.base)] placeholder:text-zinc-300",
					className,
				)}
				type={type}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "~/libs/utils";

export interface CardProps extends ComponentPropsWithRef<"div"> {
	asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, asChild, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";

		return (
			<Comp
				className={cn(
					"rounded-lg border-4 border-white bg-image-card bg-zinc-500 shadow-lg",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

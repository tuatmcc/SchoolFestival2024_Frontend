import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";

const headingVariants = cva("text-center drop-shadow-lg", {
	variants: {
		level: {
			1: "text-4xl",
			2: "text-2xl",
			3: "text-xl",
			4: "text-lg",
			5: "text-lg",
			6: "text-lg",
		},
	},
});

export interface HeadingProps extends ComponentPropsWithRef<"h1"> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	asChild?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, level = 1, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : (`h${level}` as "h1");
		return (
			<Comp
				className={headingVariants({ level, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

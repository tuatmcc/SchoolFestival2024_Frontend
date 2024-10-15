import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "~/libs/utils";

const buttonVariants = cva("px-5 py-2 relative");

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn(buttonVariants({ className }))} ref={ref} {...props}>
				<span className="-z-10 -rotate-3 absolute inset-0 skew-x-12 border-2 border-white bg-pink-400" />
				{children}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };

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
				<div className="absolute inset-0 drop-shadow-md">
					<span className="-skew-x-12 absolute inset-0 rotate-6 bg-zinc-600" />
					<span className="-rotate-6 absolute inset-0 skew-x-12 border-2 border-white bg-pink-400" />
				</div>
				<span className="drop-shadow-base">{children}</span>
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };

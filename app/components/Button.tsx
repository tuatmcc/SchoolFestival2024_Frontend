import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "~/libs/utils";

const buttonVariants = cva("px-5 py-2 relative", {
	variants: {},
});

const buttonThemeVariants = cva(
	"-rotate-6 absolute inset-0 skew-x-12 border-2 border-white bg-size-button",
	{
		variants: {
			variant: {
				pink: "bg-button-pink bg-pink-400",
				cyan: "bg-button-cyan bg-cyan-400",
				emerald: "bg-button-emerald bg-emerald-400",
				yellow: "bg-button-yellow bg-yellow-400",
			},
		},
		defaultVariants: {
			variant: "pink",
		},
	},
);

const buttonBgVariants = cva(
	"-skew-x-12 absolute inset-0 rotate-3 bg-button-bg bg-size-button-bg bg-zinc-600",
	{
		variants: {
			background: {
				true: "",
				false: "hidden",
			},
		},
		defaultVariants: {
			background: true,
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants>,
		VariantProps<typeof buttonThemeVariants>,
		VariantProps<typeof buttonBgVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, asChild = false, children, variant, background, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn(buttonVariants({ className }))} ref={ref} {...props}>
				<div className="absolute inset-0 drop-shadow-md">
					<span className={buttonBgVariants({ background })} />
					<span className={buttonThemeVariants({ variant })} />
				</div>
				<span className="drop-shadow-base">{children}</span>
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };

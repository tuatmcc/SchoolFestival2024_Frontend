import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/libs/utils";
import { useTheme } from "./Theme";

const buttonThemeVariants = cva(
	"absolute inset-0 skew-x-12 -skew-y-3 border-2 border-white bg-size-button",
	{
		variants: {
			theme: {
				pink: "bg-button-pink bg-pink-400",
				cyan: "bg-button-cyan bg-cyan-400",
				emerald: "bg-button-emerald bg-emerald-400",
				yellow: "bg-button-yellow bg-yellow-400",
			},
		},
		defaultVariants: {
			theme: "pink",
		},
	},
);

const buttonBgVariants = cva(
	"-skew-x-12 skew-y-6 absolute inset-0 bg-button-bg bg-size-button-bg bg-zinc-600",
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
		VariantProps<typeof buttonBgVariants> {
	asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, asChild = false, children, background, ...props }, ref) => {
		const theme = useTheme();

		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn("relative px-5 py-2")} ref={ref} {...props}>
				<div className="absolute inset-0 drop-shadow-md">
					<span className={buttonBgVariants({ background })} />
					<span className={buttonThemeVariants({ theme })} />
				</div>
				<span className="drop-shadow-base">{children}</span>
			</Comp>
		);
	},
);
Button.displayName = "Button";

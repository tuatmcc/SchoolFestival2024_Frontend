import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "~/libs/utils";
import { BUTTON_BG_PATTERN_ID, BUTTON_FG_PATTERN_ID } from "./Patterns";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	background?: boolean;
	asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, background = true, asChild = false, children, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn("relative px-5 py-2")} ref={ref} {...props}>
				<div className="absolute inset-0 drop-shadow-md">
					{background && (
						<svg
							className={cn(
								"-skew-x-12 absolute inset-0 h-full w-full skew-y-6",
							)}
							role="presentation"
						>
							<rect
								x="0"
								y="0"
								width="100%"
								height="100%"
								fill={`url(#${BUTTON_BG_PATTERN_ID})`}
							/>
						</svg>
					)}
					<svg
						className={cn(
							"-skew-y-3 absolute inset-0 h-full w-full skew-x-12 border-2 border-white",
						)}
						role="presentation"
					>
						<rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill={`url(#${BUTTON_FG_PATTERN_ID})`}
						/>
					</svg>
				</div>
				<span className="drop-shadow-base">{children}</span>
			</Comp>
		);
	},
);
Button.displayName = "Button";

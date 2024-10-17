import type { ReactNode } from "react";
import { useId } from "react";

import { cva } from "class-variance-authority";
import { useTheme } from "./Theme";
import { cn } from "~/libs/utils";

const bgVariants = cva("", {
	variants: {
		theme: {
			pink: "text-pink-400",
			cyan: "text-cyan-400",
			emerald: "text-emerald-400",
			yellow: "text-yellow-400",
		},
	},
});

const fgVariants = cva("", {
	variants: {
		theme: {
			pink: "text-pink-500/25",
			cyan: "text-cyan-500/25",
			emerald: "text-emerald-500/25",
			yellow: "text-yellow-500/25",
		},
	},
});

export interface BackgroundProps extends React.SVGAttributes<SVGElement> {}

export function Background({
	className,
	...props
}: BackgroundProps): ReactNode {
	const id = useId();
	const theme = useTheme();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="graphics-symbol"
			className={cn("absolute inset-0 h-full w-full", className)}
			{...props}
		>
			<defs>
				<pattern
					id={id}
					width="32"
					height="32"
					patternUnits="userSpaceOnUse"
					patternTransform="scale(2)"
				>
					<rect
						width="32"
						height="32"
						className={bgVariants({
							theme,
							className: "transition-color duration-300",
						})}
						fill="currentColor"
					/>
					<g
						className={fgVariants({
							theme,
							className: "transition-color duration-300",
						})}
						fill="currentColor"
					>
						<polygon points="0 0 0 16 16 16 12 12 20 4 12 -4 4 4 0 0" />
						<polygon points="16 16 16 32 32 32 28 28 36 20 28 12 20 20 16 16" />
						<polygon points="0 16 0 24 4 20 0 16" />
						<polygon points="8 32 12 28 16 32 8 32" />
					</g>
				</pattern>
			</defs>
			<rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
		</svg>
	);
}

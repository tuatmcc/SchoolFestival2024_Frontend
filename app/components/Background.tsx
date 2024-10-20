import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

import { cva } from "class-variance-authority";
import { useReducedMotion } from "~/hooks/useMedia";
import { cn } from "~/libs/utils";
import { useTheme } from "./Theme";

const bgVariants = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-400",
			cyan: "fill-cyan-400",
			emerald: "fill-emerald-400",
			yellow: "fill-yellow-400",
		},
	},
});

const fgVariants = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-500/25",
			cyan: "fill-cyan-500/25",
			emerald: "fill-emerald-500/25",
			yellow: "fill-yellow-500/25",
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
	const isReducedMotion = useReducedMotion();

	const svgRef = useRef<SVGSVGElement>(null);
	useEffect(() => {
		const $svg = svgRef.current;
		if (!$svg) return;

		if (isReducedMotion) {
			$svg.pauseAnimations();
		} else {
			$svg.unpauseAnimations();
		}
	}, [isReducedMotion]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="presentation"
			className={cn("-z-50 absolute inset-0 h-full w-full", className)}
			ref={svgRef}
			{...props}
		>
			<defs>
				<pattern
					id={id}
					width="64"
					height="64"
					patternUnits="userSpaceOnUse"
					patternTransform="scale(2)"
				>
					<animateTransform
						attributeType="xml"
						attributeName="patternTransform"
						type="translate"
						from="64 0"
						to="0 64"
						dur="10s"
						repeatCount="indefinite"
					/>
					<rect width="64" height="64" className={bgVariants({ theme })} />
					<g className={fgVariants({ theme })}>
						<polygon points="0 0 0 32 32 32 24 24 40 8 24 -8 8 8 0 0" />
						<polygon points="32 32 32 64 64 64 56 56 72 40 56 24 40 40 32 32" />
						<polygon points="0 32 0 48 8 40 0 32" />
						<polygon points="16 64 24 56 32 64 16 64" />
					</g>
				</pattern>
			</defs>
			<rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
		</svg>
	);
}
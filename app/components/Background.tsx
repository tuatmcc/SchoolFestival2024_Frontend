import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "~/hooks/useMedia";
import { cn } from "~/libs/utils";
import { BACKGROUND_PATTERN_ID } from "./Patterns";

export interface BackgroundProps extends React.SVGAttributes<SVGElement> {}

export function Background({
	className,
	...props
}: BackgroundProps): ReactNode {
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
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill={`url(#${BACKGROUND_PATTERN_ID})`}
			/>
		</svg>
	);
}

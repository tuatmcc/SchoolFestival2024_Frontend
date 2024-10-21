import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { useTheme } from "./Theme";

export const BACKGROUND_PATTERN_ID = "pattern-background";
export const BUTTON_FG_PATTERN_ID = "pattern-button-fg";
export const BUTTON_BG_PATTERN_ID = "pattern-button-bg";

const themeBgVariants = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-400",
			cyan: "fill-cyan-400",
			emerald: "fill-emerald-400",
			yellow: "fill-yellow-400",
		},
	},
});

const backgroundFgVariants = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-500/25",
			cyan: "fill-cyan-500/25",
			emerald: "fill-emerald-500/25",
			yellow: "fill-yellow-500/25",
		},
	},
});

const buttonFgVariant = cva("transition-color duration-300", {
	variants: {
		theme: {
			pink: "fill-pink-500/50",
			cyan: "fill-cyan-500/50",
			emerald: "fill-emerald-500/50",
			yellow: "fill-yellow-500/50",
		},
	},
});

export function Patterns(): ReactNode {
	const theme = useTheme();

	return (
		<svg width={0} height={0} className="sr-only" role="presentation">
			<defs>
				<pattern
					id={BACKGROUND_PATTERN_ID}
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
					<rect width="64" height="64" className={themeBgVariants({ theme })} />
					<g className={backgroundFgVariants({ theme })}>
						<polygon points="0 0 0 32 32 32 24 24 40 8 24 -8 8 8 0 0" />
						<polygon points="32 32 32 64 64 64 56 56 72 40 56 24 40 40 32 32" />
						<polygon points="0 32 0 48 8 40 0 32" />
						<polygon points="16 64 24 56 32 64 16 64" />
					</g>
				</pattern>
				<pattern
					id={BUTTON_FG_PATTERN_ID}
					width="32"
					height="32"
					patternTransform="scale(0.3)"
					patternUnits="userSpaceOnUse"
				>
					<rect width="32" height="32" className={themeBgVariants({ theme })} />
					<path
						d="M20 20c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4ZM4 4c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4Zm4 3.2c1.77 0 3.2-1.43 3.2-3.2S9.77.8 8 .8 4.8 2.23 4.8 4 6.23 7.2 8 7.2Zm16 16c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2 1.43 3.2 3.2 3.2Z"
						className={buttonFgVariant({ theme })}
					/>
				</pattern>
				<pattern
					id={BUTTON_BG_PATTERN_ID}
					width="18"
					height="36"
					patternTransform="scale(.2)"
					patternUnits="userSpaceOnUse"
				>
					<rect width="18" height="36" className="fill-zinc-600" />
					<g className="fill-zinc-700/75">
						<path d="M1,3h6l-3,6L1,3ZM10,21h6l-3,6-3-6Z" />
						<path d="M1,3h6l-3,6L1,3ZM10,21h6l-3,6-3-6Z" />
					</g>
				</pattern>
			</defs>
		</svg>
	);
}

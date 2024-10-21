import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"dela-gothic": ["Dela Gothic One", "sans-serif"],
			},
			boxShadow({ theme }) {
				return {
					base: `1px 1px 0 ${theme("colors.zinc.800")}`,
					md: `2px 2px 0 ${theme("colors.zinc.800")}`,
					lg: `4px 4px 0 ${theme("colors.zinc.800")}`,
				};
			},
			dropShadow({ theme }) {
				return {
					...theme("boxShadow"),
				};
			},
			transitionTimingFunction: {
				"in-backward": "cubic-bezier(.18,.89,.32,1.28)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

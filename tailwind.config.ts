import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			delagothic: ["Dela Gothic One", "sans-serif"],
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
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
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
		backgroundImage: {
			"app-cyan": 'url("/assets/app_bg_cyan.svg")',
			"app-pink": 'url("/assets/app_bg_pink.svg")',
			"app-emerald": 'url("/assets/app_bg_emerald.svg")',
			"app-yellow": 'url("/assets/app_bg_yellow.svg")',
			"button-bg": 'url("/assets/button_bg.svg")',
			"button-pink": 'url("/assets/button_bg_pink.svg")',
			"button-cyan": 'url("/assets/button_bg_cyan.svg")',
			"button-emerald": 'url("/assets/button_bg_emerald.svg")',
			"button-yellow": 'url("/assets/button_bg_yellow.svg")',
		},
		backgroundSize: {
			"size-app": "64px",
			"size-button": "16px",
			"size-button-bg": "8px 16px",
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			delagothic: ["Dela Gothic One", "sans-serif"],
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

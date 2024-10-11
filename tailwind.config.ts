import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				dela: ["Dela Gothic One", "sans-serif"],
			},
			dropShadow: {
				text: "4px 4px 0 rgb(39 39 42)",
			},
			animation: {
				"bg-slide": "bgSlide 4s linear infinite",
				bound: "bound 2s ease-in-out infinite",
			},
			keyframes: {
				bgSlide: {
					"0%": { backgroundPosition: "64px 0" },
					"100%": { backgroundPosition: "0 64px" },
				},
				bound: {
					"0%, 20%, 100%": { transform: "translateY(0)" },
					"10%": { transform: "translateY(-30%)" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;

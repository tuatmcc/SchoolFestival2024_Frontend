import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://remix.run/docs/en/main/guides/vite#plugin-usage-with-other-vite-based-tools-eg-vitest-storybook
const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
	plugins: [
		!isStorybook &&
			remix({
				future: {
					v3_fetcherPersist: true,
					v3_relativeSplatPath: true,
					v3_throwAbortReason: true,
				},
				ssr: false,
			}),
		tsconfigPaths(),
	],
});

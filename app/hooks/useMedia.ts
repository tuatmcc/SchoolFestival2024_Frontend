import { useSyncExternalStore } from "react";

export function useMedia(query: string, defaultState: boolean): boolean {
	return useSyncExternalStore(
		(callback) => {
			const media = window.matchMedia(query);

			media.addEventListener("change", callback);
			return () => {
				media.removeEventListener("change", callback);
			};
		},
		() => {
			return window.matchMedia(query).matches;
		},
		() => defaultState,
	);
}

export function useReducedMotion(): boolean {
	return useMedia("(prefers-reduced-motion: reduce)", false);
}

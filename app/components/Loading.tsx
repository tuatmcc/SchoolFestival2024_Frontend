import type { ReactNode } from "react";

export const Loading = (): ReactNode => (
	<div className="flex h-dvh w-dvw items-center justify-center">
		<div className="h-32 w-32 animate-spin rounded-full border-gray-900 border-t-2 border-b-2" />
	</div>
);

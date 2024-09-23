import type { ReactNode } from "react";

export const Loading = (): ReactNode => (
	<div className="w-dvw h-dvh flex justify-center items-center">
		<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-gray-900" />
	</div>
);

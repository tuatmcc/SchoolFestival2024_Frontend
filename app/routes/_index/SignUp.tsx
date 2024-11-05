import type { ReactNode } from "react";
import { LogginCard } from "~/components/LogginCard";

export function SignUp(): ReactNode {
	return (
		<div className="grid justify-items-center gap-8">
			<img src="/logo.svg" alt="RicoShot" className="w-full" />
			<LogginCard className="w-full rotate-2" />
		</div>
	);
}

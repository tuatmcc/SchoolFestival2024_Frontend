import type { ReactNode } from "react";
import { LoginCard } from "~/components/LoginCard";

export function SignUp(): ReactNode {
	return (
		<div className="grid justify-items-center gap-8">
			<img src="/logo.svg" alt="RicoShot" className="w-full" />
			<LoginCard className="w-full rotate-2" />
		</div>
	);
}

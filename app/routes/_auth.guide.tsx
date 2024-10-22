import type { MetaFunction } from "@remix-run/react";
import type { ReactNode } from "react";
import { Heading } from "~/components/Heading";

export const meta: MetaFunction = () => [{ title: "遊び方 | RicoShot" }];

export default function Page(): ReactNode {
	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>遊び方</Heading>
			</main>
		</div>
	);
}

import type { ReactNode } from "react";
import { Heading } from "~/components/Heading";
import { ModelViewer } from "~/components/ModelLoad";

export default function Page(): ReactNode {
	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>キャラ編集</Heading>
				<ModelViewer modelPath="/assets/chibi_sushong.glb" />
			</main>
		</div>
	);
}

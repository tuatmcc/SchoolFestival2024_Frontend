import type { ReactNode } from "react";
import { ModelViewer } from "~/components/ModelLoad";

export default function Page(): ReactNode {
	return (
		<main style={{ viewTransitionName: "main" }}>
			<h1>キャラ編集</h1>
			<ModelViewer modelPath="/assets/chibi_sushong.glb" />
		</main>
	);
}

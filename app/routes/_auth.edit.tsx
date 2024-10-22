import type { ReactNode } from "react";
import { useState } from "react";
import { Heading } from "~/components/Heading";
import { ModelViewer } from "~/components/ModelLoad";

export default function Page(): ReactNode {
	const [modelPath, setModelPath] = useState("/models/web_asuka.glb");

	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>キャラ編集</Heading>
				{/* ModelViewerを中央に配置するためのスタイルを追加 */}
				<ModelViewer modelPath={modelPath} />
				<button
					type="button"
					onClick={() => setModelPath("/models/web_jiraichan.glb")}
				>
					別のキャラを表示
				</button>
			</main>
		</div>
	);
}

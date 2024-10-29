import type { MetaFunction } from "@remix-run/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Heading } from "~/components/Heading";
import { ModelViewer } from "~/components/ModelLoad";

export const meta: MetaFunction = () => [{ title: "キャラ編集 | RicoShot" }];

export default function Page(): ReactNode {
	const [modelPath, setModelPath] = useState("/models/web_asuka.glb");
	const [models, setModels] = useState<string[]>([]);

	useEffect(() => {
		// モデルファイルを取得する関数
		const fetchModels = async () => {
			// 自動取得したかったけど，わからんかったのでハードコーディング
			const modelFiles = [
				"/models/web_asuka.glb",
				"/models/web_jiraichan.glb",
				"/models/web_kaiju.glb",
				"/models/web_necochan.glb",
				"/models/web_sushong.glb",
			];
			setModels(modelFiles);
		};

		fetchModels();
	}, []);

	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>キャラ編集</Heading>
				{/* ModelViewerを中央に配置するためのスタイルを追加 */}
				<ModelViewer
					modelPath={modelPath}
					colorMap={{
						hairfront: "#ff0000", // 頭の色を赤
					}}
				/>

				{/* モデルごとのボタンを生成 */}
				{models.map((model) => (
					<button key={model} type="button" onClick={() => setModelPath(model)}>
						{model.split("/").pop()} {/* ファイル名を表示 */}
					</button>
				))}
			</main>
		</div>
	);
}

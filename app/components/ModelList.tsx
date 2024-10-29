import { useEffect, useState } from "react";

interface ModelListProps {
	onModelSelect: (modelPath: string) => void;
}

export function ModelList({ onModelSelect }: ModelListProps) {
	const [models, setModels] = useState<string[]>([]);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		const fetchModels = async () => {
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

		// 親コンテナの幅を取得
		const containerRef = document.getElementById("model-list-container");
		if (containerRef) {
			setContainerWidth(containerRef.offsetWidth);
		}
	}, []);

	const buttonWidth = `${Math.floor(containerWidth / models.length) - 16}px`;

	return (
		// モデルリストを表示する
		<div
			id="model-list-container"
			className="mb-4 flex justify-center space-x-4"
		>
			{models.map((model: string) => (
				<button
					key={model}
					type="button"
					onClick={() => onModelSelect(model)}
					className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
					style={{ width: buttonWidth }}
				>
					{/* モデル名を取得 */}
					{model.split("/")?.pop()?.split("_")[1].split(".")[0]}
				</button>
			))}
		</div>
	);
}

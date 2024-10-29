import { useEffect, useState } from "react";

interface ModelListProps {
	onModelSelect: (modelPath: string) => void;
	updateVisibility: (key: string, value: boolean) => void;
}

export function ModelList({ onModelSelect, updateVisibility }: ModelListProps) {
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

		const updateContainerWidth = () => {
			const containerRef = document.getElementById("model-list-container");
			if (containerRef) {
				setContainerWidth(containerRef.offsetWidth);
			}
		};

		updateContainerWidth();
		window.addEventListener("resize", updateContainerWidth);

		return () => window.removeEventListener("resize", updateContainerWidth);
	}, []);

	// ボタンの幅を計算
	const buttonWidth = `${Math.floor(containerWidth / models.length) - 16}px`;
	// 表示非表示のキー
	const visibilityKeys = [
		"accessoryeyepatch",
		"accessoryglasses",
		"goggle",
		"goggle_1",
		"accessorymask",
	];

	return (
		<div>
			{/* モデル選択ボタン */}
			<div
				id="model-list-container"
				className="mb-4 flex flex-wrap justify-center space-x-2"
			>
				{models.map((model) => (
					<button
						key={model}
						type="button"
						onClick={() => onModelSelect(model)}
						className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
						style={{ width: buttonWidth }}
					>
						{model.split("/").pop()?.split("_")[1].split(".")[0]}
					</button>
				))}
			</div>
			{/* 表示非表示ボタン */}
			<div className="flex flex-col items-center">
				{visibilityKeys.map((key) => (
					<div key={key} className="flex items-center space-x-2">
						<span>{key}</span>
						<button
							type="button"
							onClick={() => updateVisibility(key, true)} // 表示するボタン
							className="rounded bg-green-200 px-2 py-1 text-gray-800 hover:bg-green-300"
						>
							表示
						</button>
						<button
							type="button"
							onClick={() => updateVisibility(key, false)} // 非表示にするボタン
							className="rounded bg-red-200 px-2 py-1 text-gray-800 hover:bg-red-300"
						>
							非表示
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

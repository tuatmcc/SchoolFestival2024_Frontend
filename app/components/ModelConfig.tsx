import { ACCESSORY_LIST, MODEL_LIST } from "~/features/profile/Profile";
import type {
	Accessory,
	CharacterSetting,
	Model,
} from "~/features/profile/Profile";

interface ModelConfigProps {
	characterSetting: CharacterSetting;
	onModelSelect?: (model: Model) => void;
	onAccessorySelect?: (accessory: Accessory) => void;
	onHairColorChange?: (color: string) => void;
}

export function ModelConfig({
	characterSetting,
	onModelSelect,
	onAccessorySelect,
	onHairColorChange,
}: ModelConfigProps) {
	return (
		<div className="mx-auto grid w-full max-w-screen-sm gap-y-4 px-4">
			<div className="flex gap-4">
				<span className="flex-shrink-0">モデル:</span>
				<div className="flex flex-grow flex-wrap justify-between gap-2">
					{MODEL_LIST.map((model) => (
						<label key={model}>
							<input
								type="radio"
								name="model"
								value={model}
								checked={model === characterSetting.character}
								onChange={() => onModelSelect?.(model)}
							/>
							<span>{model}</span>
						</label>
					))}
				</div>
			</div>

			<div className="flex gap-4">
				<span className="flex-shrink-0">アクセサリー:</span>
				<div className="flex flex-grow flex-wrap justify-between gap-2">
					{ACCESSORY_LIST.map((accessory) => (
						<label key={accessory}>
							<input
								type="radio"
								name="accessory"
								value={accessory}
								checked={accessory === characterSetting.accessory}
								onChange={() => onAccessorySelect?.(accessory)}
							/>
							<span>{accessory}</span>
						</label>
					))}
				</div>
			</div>

			<div>
				<label className="flex gap-4">
					<span className="flex-shrink-0">髪の色:</span>
					<input
						type="color"
						value={characterSetting.hair}
						onChange={(e) => {
							// TODO: 色の更新処理が頻繁に呼び出されてしまうため、debounceする
							onHairColorChange?.(e.target.value);
						}}
					/>
				</label>
			</div>

			{/* モデル選択ボタン */}
			{/* <div
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
			</div> */}
			{/* 表示非表示ボタン */}
			{/* <div className="flex flex-col items-center">
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
			</div> */}
			{/* 色変更ボタン */}
			{/* <div className="flex items-center justify-center space-x-2">
				<span className="font-medium">Hair Color:</span>
				<input
					type="color"
					value={selectedColors.hair}
					onChange={(e) => {
						setSelectedColors({ ...selectedColors, hair: e.target.value });
						updateColor("hair", e.target.value);
					}}
					className="h-8 w-8 cursor-pointer rounded border border-gray-300"
					title="髪の色を変更"
				/>
			</div> */}
		</div>
	);
}

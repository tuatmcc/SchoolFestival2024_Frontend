import * as Tabs from "@radix-ui/react-tabs";
import { ACCESSORY_LIST, MODEL_LIST } from "~/features/profile/Profile";
import type {
	Accessory,
	CharacterSetting,
	Model,
} from "~/features/profile/Profile";
import { TabBar } from "./TabBar";

const COLORS = [
	"#333333",
	"#ededed",
	"#582a22",
	"#d53b10",
	"#c56a20",
	"#a1d6f8",
	"#f5cd3d",
	"#257901",
	"#f485bb",
	// "#57a06d",
	"#345e95",
];

interface ModelConfigProps {
	characterSetting: CharacterSetting;
	onModelSelect?: (model: Model) => void;
	onCostumeSelect?: (costume: number) => void;
	onAccessorySelect?: (accessory: Accessory) => void;
	onHairColorChange?: (color: string) => void;
}

export function ModelConfig({
	characterSetting,
	onModelSelect,
	onCostumeSelect,
	onAccessorySelect,
	onHairColorChange,
}: ModelConfigProps) {
	return (
		<Tabs.Root
			className="mx-auto grid w-full max-w-screen-sm gap-y-4"
			defaultValue="costume"
		>
			<TabBar className="-mt-2 w-full" />

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
				<span className="flex-shrink-0">モデル:</span>
				<div className="flex flex-grow flex-wrap justify-between gap-2">
					{[0, 1, 2].map((idx) => (
						<label key={idx}>
							<input
								type="radio"
								name="costume"
								value={idx}
								checked={idx === characterSetting.costume}
								onChange={() => onCostumeSelect?.(idx)}
							/>
							<span>{idx + 1}番</span>
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

				<div className="flex flex-grow flex-wrap justify-between gap-2">
					{COLORS.map((color) => (
						<label key={color}>
							<input
								type="radio"
								name="hair"
								value={color}
								checked={color === characterSetting.hair}
								onChange={() => onHairColorChange?.(color)}
							/>
							<span>{color}</span>
						</label>
					))}
				</div>
			</div>
		</Tabs.Root>
	);
}

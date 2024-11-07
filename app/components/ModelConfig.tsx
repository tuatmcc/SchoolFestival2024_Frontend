import * as Tabs from "@radix-ui/react-tabs";
import { ACCESSORY_LIST, MODEL_LIST } from "~/features/profile/Profile";
import type {
	Accessory,
	CharacterSetting,
	Model,
} from "~/features/profile/Profile";
import { CardButton } from "./CardButton";
import { TabBar } from "./TabBar";

const HAIR_COLORS = [
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
	onCostumeSelect?: (model: Model, idx: number) => void;
	onAccessorySelect?: (accessory: Accessory) => void;
	onHairColorChange?: (color: string) => void;
}

export function ModelConfig({
	characterSetting,
	onCostumeSelect,
	onAccessorySelect,
	onHairColorChange,
}: ModelConfigProps) {
	return (
		<Tabs.Root
			className="mx-auto grid max-h-full w-full max-w-screen-sm grid-rows-[auto_1fr]"
			defaultValue="costume"
		>
			<div className="-mt-2 w-full sm:mt-4 sm:px-4">
				<TabBar />
			</div>

			<div className="min-h-0 overflow-auto pb-16">
				<Tabs.Content
					value="costume"
					className='grid grid-cols-3 gap-2 p-4 data-[state="inactive"]:hidden sm:grid-cols-5'
				>
					{MODEL_LIST.flatMap((model) =>
						[0, 1, 2].map((idx) => (
							<CardButton
								name="costume"
								key={`${model}_${idx}`}
								value={`${model}_${idx}`}
								checked={
									model === characterSetting.character &&
									idx === characterSetting.costume
								}
								onChange={() => {
									onCostumeSelect?.(model, idx);
								}}
								src={`/assets/character-assets/${model}_${idx}.jpg`}
							/>
						)),
					)}
				</Tabs.Content>
				<Tabs.Content
					value="accessory"
					className='grid grid-cols-3 gap-2 p-4 data-[state="inactive"]:hidden sm:grid-cols-5'
				>
					{ACCESSORY_LIST.map((accessory) => (
						<CardButton
							name="accessory"
							key={accessory}
							value={accessory}
							checked={accessory === characterSetting.accessory}
							onChange={() => onAccessorySelect?.(accessory)}
							src={`/assets/character-assets/${accessory}.jpg`}
						/>
					))}
				</Tabs.Content>
				<Tabs.Content
					value="hair"
					className='grid grid-cols-3 gap-2 p-4 data-[state="inactive"]:hidden sm:grid-cols-5'
				>
					{HAIR_COLORS.map((color) => (
						<CardButton
							name="hair"
							key={color}
							value={color}
							checked={color === characterSetting.hair}
							onChange={() => onHairColorChange?.(color)}
							color={color}
						/>
					))}
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}

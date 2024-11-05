import type { MetaFunction } from "@remix-run/react";
import type { ReactNode } from "react";
import { ModelConfig } from "~/components/ModelConfig";
import { ModelViewer } from "~/components/ModelLoad";
import type { Accessory, Model } from "~/features/profile/Profile";
import { useMyProfile } from "~/features/profile/useMyProfile";

export const meta: MetaFunction = () => [{ title: "キャラ編集 | RicoShot" }];

export default function Page(): ReactNode {
	const { myProfile, updateCharacterSetting } = useMyProfile();
	if (!myProfile) return null;

	const handleModelSelect = (model: Model) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			character: model,
		});
	};

	const handleCostumeSelect = (costume: number) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			costume,
		});
	};

	const handleAccessorySelect = (accessory: Accessory) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			accessory,
		});
	};

	const handleHairColorChange = (color: string) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			hair: color,
		});
	};

	return (
		<div className="min-h-dvh w-full" style={{ viewTransitionName: "main" }}>
			<main className="grid w-full gap-y-4">
				<ModelViewer characterSetting={myProfile.characterSetting} />
				<ModelConfig
					characterSetting={myProfile.characterSetting}
					onModelSelect={handleModelSelect}
					onCostumeSelect={handleCostumeSelect}
					onAccessorySelect={handleAccessorySelect}
					onHairColorChange={handleHairColorChange}
				/>
			</main>
		</div>
	);
}

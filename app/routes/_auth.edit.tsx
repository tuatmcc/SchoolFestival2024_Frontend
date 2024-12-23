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

	const handleCostumeSelect = (model: Model, idx: number) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			character: model,
			costume: idx,
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
		<div
			className="h-dvh w-full overflow-hidden"
			style={{ viewTransitionName: "main" }}
		>
			<main className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)]">
				<ModelViewer characterSetting={myProfile.characterSetting} />
				<ModelConfig
					characterSetting={myProfile.characterSetting}
					onCostumeSelect={handleCostumeSelect}
					onAccessorySelect={handleAccessorySelect}
					onHairColorChange={handleHairColorChange}
				/>
			</main>
		</div>
	);
}

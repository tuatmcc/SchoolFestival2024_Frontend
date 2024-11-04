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

	const handleAccessorySelect = (accessory: Accessory) => {
		updateCharacterSetting({
			...myProfile.characterSetting,
			accessory,
		});
	};

	return (
		<div className="min-h-dvh w-full" style={{ viewTransitionName: "main" }}>
			<main className="grid w-full gap-y-4">
				<ModelViewer characterSetting={myProfile.characterSetting} />
				<ModelConfig
					characterSetting={myProfile.characterSetting}
					onModelSelect={handleModelSelect}
					onAccessorySelect={handleAccessorySelect}
				/>
			</main>
		</div>
	);
}

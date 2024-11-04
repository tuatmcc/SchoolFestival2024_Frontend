import type { MetaFunction } from "@remix-run/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { getMeshColor } from "~/components/ModelColor";
import { ModelConfig } from "~/components/ModelConfig";
import { ModelViewer } from "~/components/ModelLoad";
import { getMeshVisibility } from "~/components/ModelVisibility";
import { useMyProfile } from "~/features/profile/useMyProfile";

export const meta: MetaFunction = () => [{ title: "キャラ編集 | RicoShot" }];

export default function Page(): ReactNode {
	const { myProfile } = useMyProfile();
	if (!myProfile) return null;

	const [modelPath, setModelPath] = useState("/models/web_asuka.glb");
	const { meshVisibility, updateVisibility } = getMeshVisibility();
	const { meshColor, updateVisibility: updateColor } = getMeshColor();

	return (
		<div className="min-h-dvh w-full" style={{ viewTransitionName: "main" }}>
			<main className="grid w-full gap-y-4">
				<ModelViewer characterSetting={myProfile.characterSetting} />
				<ModelConfig
					onModelSelect={setModelPath}
					updateVisibility={updateVisibility}
					updateColor={updateColor}
				/>
			</main>
		</div>
	);
}

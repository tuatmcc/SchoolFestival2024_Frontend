import type { MetaFunction } from "@remix-run/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Heading } from "~/components/Heading";
import { ModelList } from "~/components/ModelList";
import { ModelViewer } from "~/components/ModelLoad";
import { useMeshVisibility } from "~/components/ModelVisibility";

export const meta: MetaFunction = () => [{ title: "キャラ編集 | RicoShot" }];

export default function Page(): ReactNode {
	const [modelPath, setModelPath] = useState("/models/web_asuka.glb");
	const meshVisibility = useMeshVisibility(modelPath);

	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4">
				<Heading>キャラ編集</Heading>
				<ModelViewer
					modelPath={modelPath}
					colorMap={{
						hairfront: "#ff0000", // 頭の色を赤
					}}
					meshVisibility={meshVisibility}
				/>
				<ModelList onModelSelect={setModelPath} />
			</main>
		</div>
	);
}

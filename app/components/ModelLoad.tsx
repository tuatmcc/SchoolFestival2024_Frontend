import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode, useEffect, useRef } from "react";
import type { Group, MeshStandardMaterial } from "three";
import * as THREE from "three";

function Model({
	path,
	colorMap,
	meshVisibility,
}: {
	path: string;
	colorMap: { [key: string]: string };
	meshVisibility: { [key: string]: boolean };
}): ReactNode {
	const { scene } = useGLTF(path);
	// モデルのグループ（オブジェクト全体）にアクセスするための参照を作成
	const groupRef = useRef<Group>(null);

	useEffect(() => {
		scene.traverse((child: THREE.Object3D) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;

				// メッシュ名をコンソールに出力
				// console.log("Mesh name:", mesh.name);

				// 部位名がmeshVisibilityのキーに一致する場合に表示非表示を設定
				if (
					Object.hasOwn(meshVisibility, mesh.name) &&
					!meshVisibility[mesh.name]
				) {
					mesh.visible = false;
					return;
				}

				mesh.visible = true;

				const material = mesh.material as MeshStandardMaterial;

				// 部位名がcolorMapのキーに一致する場合に色を設定
				if (Object.hasOwn(colorMap, mesh.name)) {
					material.color.set(colorMap[mesh.name]);
				}
			}
		});
	}, [scene, colorMap, meshVisibility]);

	return (
		// グループとしてシーンをレンダリング
		<group ref={groupRef} position={[0, -0.5, 0]}>
			{/* モデルのプリミティブ（生のオブジェクト）を表示 */}
			<primitive object={scene} />
		</group>
	);
}

// 3Dモデルビューアーコンポーネント
// モデルのパスを受け取って、それを表示する
type ModelViewerProps = {
	modelPath: string; // モデルのパス
	colorMap: { [key: string]: string }; // 部位ごとの色マップ
	meshVisibility: { [key: string]: boolean }; // 部位ごとの表示非表示
};
export function ModelViewer({
	modelPath,
	colorMap,
	meshVisibility,
}: ModelViewerProps): ReactNode {
	return (
		<Canvas
			className="aspect-square h-auto w-full sm:max-h-[50dvh]"
			scene={{
				background: new THREE.Color(0xffffff),
			}}
			camera={{
				position: [0, 0, 2],
				fov: 30,
			}} // カメラの初期位置と視野角を設定
		>
			{/* 環境を設定*/}
			<Environment preset="lobby" />
			{/* GLBモデルの読み込みと表示 */}
			<Model
				path={modelPath}
				colorMap={colorMap}
				meshVisibility={meshVisibility}
			/>
			{/* カメラコントロールの追加（ユーザーが自由にカメラを操作できるようにする） */}
			<OrbitControls
				enableZoom={false}
				enablePan={false}
				minPolarAngle={(Math.PI / 5) * 2}
				maxPolarAngle={(Math.PI / 5) * 2}
			/>
		</Canvas>
	);
}

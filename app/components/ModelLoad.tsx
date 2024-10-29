import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode, useRef, useEffect } from "react";
import type { Group, MeshStandardMaterial } from "three";
import * as THREE from 'three';

/*
Mesh name: accessoryeyepatch
Mesh name: accessoryglassess
Mesh name: goggle
Mesh name: goggle_1
Mesh name: accessorymask
Mesh name: body_1
Mesh name: body_2
Mesh name: clothesribbon
Mesh name: clothesskirt
Mesh name: clothestops
Mesh name: clothestops001
Mesh name: hairback
Mesh name: hairear
Mesh name: hairfront
Mesh name: hairtail
Mesh name: head_1
Mesh name: head_2
*/

function Model({ path, colorMap }: { path: string; colorMap: { [key: string]: string } }): ReactNode {
	const { scene } = useGLTF(path);
	// モデルのグループ（オブジェクト全体）にアクセスするための参照を作成
	const groupRef = useRef<Group>(null);

	useEffect(() => {
		scene.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;

				// 部位名をコンソールに出力
				console.log("Mesh name:", mesh.name);

				const material = mesh.material as MeshStandardMaterial;

				// 部位名がcolorMapのキーに一致する場合に色を設定
				if (colorMap[mesh.name]) {
					material.color.set(colorMap[mesh.name]);
				}
			}
		});
	}, [scene, colorMap]);

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
	modelPath: string;            // モデルのパス
	colorMap: { [key: string]: string }; // 部位ごとの色マップ
};
export function ModelViewer({ modelPath, colorMap }: ModelViewerProps): ReactNode {
	return (
		<div>
			{/* 3Dモデルを表示するためのCanvasエリア */}
			<div style={{ height: "60vh" }}>
				<Canvas
					camera={{
						position: [0, 0, 4],
						fov: 30,
					}} // カメラの初期位置と視野角を設定
				>
					{/* 環境を設定*/}
					<Environment preset="studio" />
					{/* 環境光を追加（全体的に均一な光を当てる） */}
					<ambientLight intensity={0.5} />
					{/* GLBモデルの読み込みと表示 */}
					<Model path={modelPath} colorMap={colorMap} />
					{/* カメラコントロールの追加（ユーザーが自由にカメラを操作できるようにする） */}
					<OrbitControls makeDefault />
				</Canvas>
			</div>
		</div>
	);
}

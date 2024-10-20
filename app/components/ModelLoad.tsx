import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode, useRef, useState } from "react";
import type { Group } from "three";

// 3Dモデルを表示するためのコンポーネント
// パスを受け取って、そのGLTF形式の3Dモデルを読み込む
function Model({ path }: { path: string }): ReactNode {
	// useGLTFはGLB/GLTFファイルを読み込むためのフック
	// sceneにはモデルのシーン情報が格納されます
	const { scene } = useGLTF(path);
	// モデルのグループ（オブジェクト全体）にアクセスするための参照を作成
	const groupRef = useRef<Group>(null);

	return (
		// グループとしてシーンをレンダリング
		<group ref={groupRef}>
			{/* モデルのプリミティブ（生のオブジェクト）を表示 */}
			<primitive object={scene} />
		</group>
	);
}

// 3Dモデルビューアーコンポーネント
// モデルのパスを受け取って、それを表示する
type ModelViewerProps = {
	modelPath: string; // モデルのパス
	height?: number | string; // 高さ
	width?: number | string; // 幅
};
export function ModelViewer({
	modelPath,
	height = "80vh",
	width = "50vw",
}: ModelViewerProps): ReactNode {
	return (
		<div>
			{/* 3Dモデルを表示するためのCanvasエリア */}
			<div style={{ height: height, width: width, margin: "auto" }}>
				<Canvas
					camera={{ position: [0, 0, 5], fov: 50 }} // カメラの初期位置と視野角を設定
				>
					{/* 環境を設定*/}
					<Environment preset="studio" />
					{/* 環境光を追加（全体的に均一な光を当てる） */}
					<ambientLight intensity={0.5} />
					{/* スポットライトを追加（シーンに方向性のある光を当てる） */}
					<spotLight
						position={[10, 10, 10]} // スポットライトの位置
						angle={0.15} // スポットライトの角度
						penumbra={1} // スポットライトの影のぼかし具合
						decay={0} // 光の減衰を設定
						intensity={3} // 光の強さを設定
					/>

					{/* GLBモデルの読み込みと表示 */}
					<Model path={modelPath} />

					{/* カメラコントロールの追加（ユーザーが自由にカメラを操作できるようにする） */}
					<OrbitControls makeDefault />
				</Canvas>
			</div>
		</div>
	);
}

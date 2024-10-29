import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode, useRef } from "react";
import type { Group } from "three";

// 3Dモデルを表示するためのコンポーネント
// パスを受け取って、そのGLB形式の3Dモデルを読み込む
function Model({ path }: { path: string }): ReactNode {
	// useGLTFはGLB/GLTFファイルを読み込むためのフック
	// sceneにはモデルのシーン情報が格納されます
	const { scene } = useGLTF(path);
	// モデルのグループ（オブジェクト全体）にアクセスするための参照を作成
	const groupRef = useRef<Group>(null);

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
};
export function ModelViewer({ modelPath }: ModelViewerProps): ReactNode {
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
					<Model path={modelPath} />
					{/* カメラコントロールの追加（ユーザーが自由にカメラを操作できるようにする） */}
					<OrbitControls makeDefault />
				</Canvas>
			</div>
		</div>
	);
}

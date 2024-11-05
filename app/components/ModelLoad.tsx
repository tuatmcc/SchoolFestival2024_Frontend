import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type ReactNode, useEffect, useRef } from "react";
import type { Group, MeshStandardMaterial } from "three";
import * as THREE from "three";
import type { Accessory, CharacterSetting } from "~/features/profile/Profile";

const HAIR_MESH_NAMES = [
	"hairear",
	"hairback",
	"hairfront",
	"hairtail",
	"hairside",
	"hairsid",
	"hair",
] as const;
type HairMeshName = (typeof HAIR_MESH_NAMES)[number];

const ACCESSORY_METH_NAMES = [
	"accessoryeyepatch",
	"accessoryglasses",
	"goggle",
	"goggle_1",
	"accessoryhalo",
] as const;
type AccessoryMeshName = (typeof ACCESSORY_METH_NAMES)[number];

const ACCESSORY_MAP: Record<Accessory, AccessoryMeshName[]> = {
	none: [],
	eyepatch: ["accessoryeyepatch"],
	glasses: ["accessoryglasses"],
	goggle: ["goggle", "goggle_1"],
	halo: ["accessoryhalo"],
};

function useCharacterSetting(setting: CharacterSetting) {
	const modelPath = `/models/web_${setting.character}.glb`;

	const { scene } = useGLTF(modelPath);

	useEffect(() => {
		const threeTone = new THREE.TextureLoader().load("/assets/threeTone.jpg");
		threeTone.minFilter = THREE.NearestFilter;
		threeTone.magFilter = THREE.NearestFilter;

		scene.traverse((child) => {
			if (!(child as THREE.Mesh).isMesh) return;
			const mesh = child as THREE.Mesh;
			const oldMaterial = mesh.material as MeshStandardMaterial;
			const newMaterial = new THREE.MeshToonMaterial({
				name: oldMaterial.name,
				color: oldMaterial.color,
				gradientMap: threeTone,
				map: oldMaterial.map,
				emissive: oldMaterial.emissive,
				emissiveIntensity: oldMaterial.emissiveIntensity,
				emissiveMap: oldMaterial.emissiveMap,
			});
			mesh.material = newMaterial;
		});
	}, [scene]);

	useEffect(() => {
		scene.traverse((child) => {
			if (!(child as THREE.Mesh).isMesh) return;
			const mesh = child as THREE.Mesh;

			// アクセサリーのmeshは基本非表示
			if (ACCESSORY_METH_NAMES.includes(mesh.name as AccessoryMeshName)) {
				mesh.visible = false;
			}
			// アクセサリーのmeshのうち、設定されたアクセサリーに対応するものだけ表示
			const visibleAccessoryMeshNames = ACCESSORY_MAP[setting.accessory];
			if (visibleAccessoryMeshNames.includes(mesh.name as AccessoryMeshName)) {
				mesh.visible = true;
			}

			// 髪のmeshの場合は色を設定
			if (HAIR_MESH_NAMES.includes(mesh.name as HairMeshName)) {
				const material = mesh.material as MeshStandardMaterial;
				material.color.set(setting.hair);
			}
		});
	}, [scene, setting]);

	return scene;
}

interface ModelProps {
	characterSetting: CharacterSetting;
}

function Model({ characterSetting }: ModelProps): ReactNode {
	const scene = useCharacterSetting(characterSetting);

	return (
		// グループとしてシーンをレンダリング
		<group position={[0, -0.5, 0]}>
			{/* モデルのプリミティブ（生のオブジェクト）を表示 */}
			<primitive object={scene} />
		</group>
	);
}

export function ModelViewer({ characterSetting }: ModelProps): ReactNode {
	return (
		<Canvas
			className="aspect-square h-auto w-full sm:max-h-[50dvh]"
			scene={{
				background: new THREE.Color("#000000"),
			}}
			camera={{
				position: [0, 0, 2],
				fov: 30,
			}} // カメラの初期位置と視野角を設定
		>
			{/* ライトを設定 */}
			<ambientLight />
			<directionalLight position={[6, 5, 5]} intensity={1} />
			{/* ポストプロセッシング */}
			<EffectComposer>
				<Bloom intensity={1} luminanceThreshold={1} radius={0.8} mipmapBlur />
			</EffectComposer>
			{/* GLBモデルの読み込みと表示 */}
			<Model characterSetting={characterSetting} />
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

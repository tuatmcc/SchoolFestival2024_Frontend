import { Billboard, OrbitControls, Text, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type ReactNode, Suspense, useEffect, useMemo, useRef } from "react";
import type { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { OutlineEffect } from "three/addons/effects/OutlineEffect.js";
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

	const threeTone = useMemo(() => {
		const threeTone = new THREE.TextureLoader().load("/assets/threeTone.jpg");
		threeTone.minFilter = THREE.NearestFilter;
		threeTone.magFilter = THREE.NearestFilter;

		return threeTone;
	}, []);

	useEffect(() => {
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
	}, [scene, threeTone]);

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
				background: new THREE.Color("#0ea5e9"),
			}}
			camera={{
				position: [1, 0, 2],
				fov: 30,
			}} // カメラの初期位置と視野角を設定
		>
			{/* ライトを設定 */}
			<ambientLight />
			<directionalLight position={[6, 5, 5]} intensity={1} />
			{/* ポストプロセッシング */}
			<EffectComposer autoClear={false}>
				<Bloom intensity={1} luminanceThreshold={1} radius={0.8} mipmapBlur />
			</EffectComposer>
			<Suspense
				fallback={
					<Billboard>
						<Text
							fontSize={0.1}
							font="/assets/font.ttf"
							characters="読み込み中…"
						>
							読み込み中…
						</Text>
					</Billboard>
				}
			>
				{/* GLBモデルの読み込みと表示 */}
				<Model characterSetting={characterSetting} />
			</Suspense>
			{/* カメラコントロールの追加（ユーザーが自由にカメラを操作できるようにする） */}
			<OrbitControls
				enablePan={false}
				minPolarAngle={(Math.PI / 5) * 2}
				maxPolarAngle={(Math.PI / 5) * 2}
				maxDistance={3}
				minDistance={1}
				autoRotate
				autoRotateSpeed={2}
			/>
			{/* アウトラインエフェクト */}
			{/* <OutlineRenderer /> */}
		</Canvas>
	);
}

// 参考: https://github.com/pmndrs/react-three-fiber/discussions/1045
function OutlineRenderer(): ReactNode {
	const { size, gl, scene, camera } = useThree();

	const effect = useMemo(() => {
		const effect = new OutlineEffect(gl, {
			defaultThickness: 0.003,
			defaultColor: new THREE.Color("#333333").toArray(),
		});

		return effect;
	}, [gl]);

	useEffect(() => {
		effect.setSize(size.width, size.height);
	}, [effect, size]);

	useFrame(() => {
		effect.render(scene, camera);
	}, 1);

	return null;
}

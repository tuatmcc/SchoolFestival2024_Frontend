import { Billboard, OrbitControls, Text, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type ReactNode, Suspense, useEffect, useMemo, useRef } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import type { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { OutlineEffect } from "three/addons/effects/OutlineEffect.js";
import type {
	Accessory,
	CharacterSetting,
	Model,
} from "~/features/profile/Profile";

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

const COSTUME_MAP: Record<Model, string[]> = {
	jiraichan: ["#FFA0C0", "#FFD700", "#FFA07A"],
	necochan: ["#00DCFF", "#FF66CC", "#99FF00"],
	asuka: ["#0D5793", "#F2C800", "#F57D9D"],
	kaiju: ["#00FF33", "#009966", "#FF6600"],
	sushong: ["#ff0000", "#ffcc00", "#0099ff"],
};

const COSTUME_MATERIAL_NAMES = [
	"clothes_primary",
	"parker_primary",
	"gothloli_primary",
];

function useCharacterSetting(setting: CharacterSetting) {
	const modelPath = `/models/web_${setting.character}.glb`;

	const { scene, materials } = useGLTF(modelPath);

	// トゥーンシェーディング用のテクスチャを読み込み
	const threeTone = useMemo(() => {
		const threeTone = new THREE.TextureLoader().load("/assets/threeTone.jpg");
		threeTone.minFilter = THREE.NearestFilter;
		threeTone.magFilter = THREE.NearestFilter;

		return threeTone;
	}, []);

	// トゥーンシェーディング用のマテリアルを作成
	const toonMaterials = useMemo(() => {
		const toonMaterials: Record<string, THREE.MeshToonMaterial> = {};

		for (const key of Object.keys(materials)) {
			const oldMaterial = materials[key] as MeshStandardMaterial;
			const newMaterial = new THREE.MeshToonMaterial({
				name: oldMaterial.name,
				color: oldMaterial.color,
				gradientMap: threeTone,
				map: oldMaterial.map,
				emissive: oldMaterial.emissive,
				emissiveIntensity: oldMaterial.emissiveIntensity,
				emissiveMap: oldMaterial.emissiveMap,
				side: oldMaterial.side,
				opacity: oldMaterial.opacity,
				transparent: oldMaterial.transparent,
			});

			toonMaterials[key] = newMaterial;
		}

		return toonMaterials;
	}, [threeTone, materials]);

	// マテリアルをトゥーンシェーディング用に差し替え
	useEffect(() => {
		scene.traverse((child) => {
			if (!(child as THREE.Mesh).isMesh) return;
			const mesh = child as THREE.Mesh;
			mesh.material =
				toonMaterials[(mesh.material as MeshStandardMaterial).name];
		});
	}, [scene, toonMaterials]);

	// 髪のマテリアルの色を反映
	useEffect(() => {
		toonMaterials.hair.color.set(setting.hair);
	}, [toonMaterials, setting.hair]);

	// 衣装のマテリアルの色を反映
	useEffect(() => {
		for (const name of COSTUME_MATERIAL_NAMES) {
			const costumeMaterial = toonMaterials[name];
			if (costumeMaterial) {
				costumeMaterial.color.set(
					COSTUME_MAP[setting.character][setting.costume],
				);
			}
		}
	}, [toonMaterials, setting.character, setting.costume]);

	// アクセサリーの表示を切り替え
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
		});
	}, [scene, setting]);

	return scene;
}

interface ModelProps {
	characterSetting: CharacterSetting;
}

function Character({ characterSetting }: ModelProps): ReactNode {
	const scene = useCharacterSetting(characterSetting);

	return (
		// グループとしてシーンをレンダリング
		<group position={[0, -0.5, 0]}>
			{/* モデルのプリミティブ（生のオブジェクト）を表示 */}
			<primitive object={scene} />
		</group>
	);
}

export function Viewer({ characterSetting }: ModelProps): ReactNode {
	return (
		<Canvas
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
				<Character characterSetting={characterSetting} />
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

function ErrorFallback(): ReactNode {
	return (
		<div className="grid h-full w-full place-items-center bg-sky-500">
			<p className="text-lg drop-shadow-base">表示できません :(</p>
		</div>
	);
}

export function ModelViewer({ characterSetting }: ModelProps): ReactNode {
	return (
		<div className="h-[40dvh] w-full">
			<ErrorBoundary fallback={<ErrorFallback />}>
				<Viewer characterSetting={characterSetting} />
			</ErrorBoundary>
		</div>
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

import { useCallback, useMemo, useRef, useState } from "react";

export function getMeshVisibility() {
	const instanceRef = useRef<{ [key: string]: boolean } | null>(null); // シングルトンインスタンスを保持
	const [visibility, setVisibility] = useState<{
		[key: string]: boolean;
	} | null>(null);

	const generateMeshVisibility = useCallback((): { [key: string]: boolean } => {
		if (instanceRef.current) return instanceRef.current; // 既存のインスタンスを返す

		// 初期値は非表示
		instanceRef.current = {
			accessoryeyepatch: false,
			accessoryglasses: false,
			goggle: false,
			goggle_1: false,
			accessoryhalo: false,
		};
		setVisibility(instanceRef.current); // 状態を更新
		return instanceRef.current;
	}, []);

	const updateVisibility = useCallback((key: string, value: boolean) => {
		if (instanceRef.current) {
			instanceRef.current[key] = value; // 値を更新
			setVisibility({ ...instanceRef.current }); // 状態を更新
		}
	}, []);

	const meshVisibility = useMemo(() => {
		return visibility || generateMeshVisibility(); // 初回は生成したものを使用
	}, [visibility, generateMeshVisibility]);

	return { meshVisibility, updateVisibility }; // 可視性と更新関数を返す
}

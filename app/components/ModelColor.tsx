import { useCallback, useMemo, useRef, useState } from "react";

export function getMeshColor() {
	const instanceRef = useRef<{ [key: string]: string } | null>(null); // シングルトンインスタンスを保持
	const [visibility, setVisibility] = useState<{
		[key: string]: string;
	} | null>(null);

	const generateMeshColor = useCallback((): { [key: string]: string } => {
		if (instanceRef.current) return instanceRef.current; // 既存のインスタンスを返す

		// 初期値は白
		instanceRef.current = {
			hairear: "#ffffff",
			hairback: "#ffffff",
			hairfront: "#ffffff",
			hairtail: "#ffffff",
			hairsid: "#ffffff",
			hair: "#ffffff",
		};
		setVisibility(instanceRef.current); // 状態を更新
		return instanceRef.current;
	}, []);

	const updateVisibility = useCallback((key: string, color: string) => {
		if (instanceRef.current) {
			instanceRef.current[key] = color; // 値を更新
			if (key === "hair") {
				instanceRef.current.hairear = color;
				instanceRef.current.hairback = color;
				instanceRef.current.hairfront = color;
				instanceRef.current.hairtail = color;
				instanceRef.current.hairsid = color;
			}
			setVisibility({ ...instanceRef.current }); // 状態を更新
		}
	}, []);

	const meshColor = useMemo(() => {
		return visibility || generateMeshColor(); // 初回は生成したものを使用
	}, [visibility, generateMeshColor]);

	return { meshColor, updateVisibility }; // 可視性と更新関数を返す
}

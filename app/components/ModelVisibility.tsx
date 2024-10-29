import { useCallback, useMemo } from "react";

export function useMeshVisibility(modelPath: string) {
	const generateMeshVisibility = useCallback(
		(modelName: string): { [key: string]: boolean } => {
			switch (modelName) {
				case "asuka":
					return {
						accessoryeyepatch: true,
						accessoryglassess: false,
						goggle: false,
						goggle_1: false,
						accessorymask: false,
					};
				case "jiraichan":
					return {
						accessoryeyepatch: false,
						accessoryglassess: true,
						goggle: true,
						goggle_1: true,
						accessorymask: true,
					};
				case "kaiju":
				case "necochan":
				case "sushong":
					return {
						accessoryeyepatch: false,
						accessoryglassess: false,
						goggle: false,
						goggle_1: false,
						accessorymask: false,
					};
				default:
					return {};
			}
		},
		[],
	);

	const meshVisibility = useMemo(() => {
		const modelName =
			modelPath.split("/").pop()?.split("_")[1].split(".")[0] || "";
		return generateMeshVisibility(modelName);
	}, [modelPath, generateMeshVisibility]);

	return meshVisibility;
}

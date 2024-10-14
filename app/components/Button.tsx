import type { ReactNode } from "react";

export interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps): ReactNode {
	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	);
}

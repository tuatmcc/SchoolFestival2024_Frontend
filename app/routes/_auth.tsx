import { Outlet, useNavigate } from "@remix-run/react";
import { type ReactNode, useLayoutEffect } from "react";
import { useSession } from "~/hooks/useSession";

// _auth.**.tsx のパスへのアクセスは必ずここで前処理される
export default function Layout(): ReactNode {
	const navigate = useNavigate();
	const session = useSession();

	useLayoutEffect(() => {
		if (!session) {
			navigate("/signin");
		}
	}, [session, navigate]);

	return <Outlet />;
}

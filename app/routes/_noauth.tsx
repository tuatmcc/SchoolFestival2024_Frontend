import { Outlet, useNavigate } from "@remix-run/react";
import type { ReactNode } from "react";
import { useLayoutEffect } from "react";

import { useSession } from "~/hooks/useSession";

// _noauth.**.tsx のパスへのアクセスは必ずここで前処理される
export default function Layout(): ReactNode {
	const navigate = useNavigate();
	const session = useSession();

	useLayoutEffect(() => {
		if (session) {
			navigate("/");
		}
	}, [session, navigate]);

	return <Outlet />;
}

import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/react";
import type { ReactNode } from "react";
import { preload } from "swr";
import { sessionFetcher, useSession } from "~/hooks/useSession";

export async function clientLoader() {
	const session = await preload("session", sessionFetcher);
	if (!session) {
		return redirect("/");
	}

	return null;
}

// _auth.**.tsx のパスへのアクセスは必ずここで前処理される
export default function Layout(): ReactNode {
	return <Outlet />;
}

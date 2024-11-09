import type { MetaFunction } from "@remix-run/react";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Heading } from "~/components/Heading";

export const meta: MetaFunction = () => [{ title: "遊び方 | RicoShot" }];

export default function Page(): ReactNode {
	return (
		<div
			className="min-h-dvh w-full p-4"
			style={{ viewTransitionName: "main" }}
		>
			<main className="mx-auto grid w-full max-w-screen-sm gap-y-4 pb-16">
				<Heading>遊び方</Heading>
				<div>
					<p className={paragraph()}>
						RicoShotは4対4に分かれて戦うチーム対戦型のシューティングゲームです。
						2分間の試合で、敵を倒してポイントを稼ぎましょう。
					</p>
					<img
						src="/assets/guide/playing.jpg"
						alt="プレイ画面"
						className={image({ dir: "left" })}
					/>
					<p className={paragraph()}>
						操作はコントローラーを使います。使うボタンは少ないので、ゲーム初心者でもすぐに慣れるはずです！
					</p>
					<img
						src="/assets/guide/controller.jpg"
						alt="操作方法"
						className={image({ dir: "right" })}
					/>
				</div>
			</main>
		</div>
	);
}

const paragraph = cva("drop-shadow-base my-4");
const image = cva(
	"w-full border-white border-8 shadow-lg my-4 mx-1 aspect-video",
	{
		variants: {
			dir: {
				left: "rotate-2",
				right: "-rotate-2",
			},
		},
	},
);

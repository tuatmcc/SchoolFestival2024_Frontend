import type { MetaFunction } from "@remix-run/node";
import LogoSrc from "~/assets/logo.svg";

export const meta: MetaFunction = () => {
	return [
		{ title: "RicoShot" },
		{
			name: "description",
			content:
				"RicoShotはマルチプレイ対応の対戦シューティングゲームです。好きなキャラを選択、カスタマイズしてハイスコアを目指しましょう！",
		},
	];
};

export default function Page() {
	return (
		<main className="grid min-h-dvh w-full place-items-center p-4">
			<div className="w-full max-w-screen-md">
				<h1 className="w-full">
					<img src={LogoSrc} alt="RicoShot" style={{ aspectRatio: "6 / 4" }} />
				</h1>
				<p className="w-full text-center text-4xl drop-shadow-text sm:text-6xl">
					{[..."ただいま準備中"].map((char, idx) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: suppress
							key={idx}
							className="inline-block animate-bound"
							style={{ animationDelay: `${idx * 100}ms` }}
						>
							{char}
						</span>
					))}
				</p>
			</div>
		</main>
	);
}

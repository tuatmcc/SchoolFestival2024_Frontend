import { useEffect, useRef } from "react";
import { useFetchRanking } from "~/hooks/useRanking";
import { cn } from "~/libs/utils";

interface RankingItemProps {
	rank: number | null;
	name: string;
	score: number | null;
}

function RankingItem({ rank, name, score }: RankingItemProps) {
	let rankColorClass: string;
	switch (rank) {
		case 1:
			rankColorClass = "text-yellow-400";
			break;
		case 2:
			rankColorClass = "text-gray-300";
			break;
		case 3:
			rankColorClass = "text-orange-500";
			break;
		default:
			rankColorClass = "";
	}

	return (
		<li className="-rotate-2 flex justify-between rounded-br-xl border-4 border-white bg-image-card bg-zinc-500 px-4 py-2 drop-shadow-md">
			<span className={cn("flex-shrink-0 drop-shadow-base", rankColorClass)}>
				{rank}位
			</span>
			<span className="text-center drop-shadow-base">{name}</span>
			<span className="drop-shadow-base">{score}</span>
		</li>
	);
}

export function RankingList() {
	const { ranking, isValidating, loadMore, hasMore } = useFetchRanking();
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isValidating || !loadMoreRef.current) return;

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				if (entries[0].isIntersecting && hasMore && !isValidating) {
					loadMore();
				}
			},
		);
		observer.observe(loadMoreRef.current);

		return () => {
			observer.disconnect();
		};
	}, [isValidating, loadMore, hasMore]);

	return (
		<div className="grid gap-y-2 py-16">
			<div className="text-center text-2xl drop-shadow-md">ランキング</div>
			<ul className="grid gap-y-4">
				{ranking.map(
					(item) =>
						item && (
							<RankingItem
								key={item.id}
								rank={item.rank}
								name={item.displayName}
								score={item.highScore}
							/>
						),
				)}
			</ul>
			<div className="mx-auto mt-2 drop-shadow-md" ref={loadMoreRef}>
				{isValidating && (
					<div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
				)}
			</div>
		</div>
	);
}

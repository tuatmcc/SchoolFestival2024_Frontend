import { useEffect, useRef } from "react";
import { useFetchRanking } from "~/hooks/useRanking";
import "../Ranking.css";

interface RankingItemProps {
	rank: number | null;
	name: string;
	score: number | null;
}

function RankingItem({ rank, name, score }: RankingItemProps) {
	const getRankClass = () => {
		if (rank === 1) return "rank-first";
		if (rank === 2) return "rank-second";
		if (rank === 3) return "rank-third";
		return "rank-default";
	};

	return (
		<div className="ranking-item">
			<span className={`${getRankClass()}`}>{rank}位</span>
			<span className="name">{name}</span>
			<span className="score">{score}</span>
		</div>
	);
}

export function RankingList() {
	const { ranking, error, isLoading, isValidating, loadMore, hasMore } =
		useFetchRanking();
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

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error!!</div>;

	if (!ranking || ranking.length === 0) {
		return <div>No Ranking ranking.</div>;
	}

	return (
		<div className="ranking-list">
			<div className="ranking-title">ランキング</div>
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
			<div ref={loadMoreRef}>
				{isValidating && <p className="ranking-loading-text">Loading...</p>}
			</div>
		</div>
	);
}

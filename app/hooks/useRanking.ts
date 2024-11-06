import useSWRInfinite from "swr/infinite";
import type { Ranking } from "~/features/profile/Profile";
import { supabase } from "~/libs/supabase";

const fetchRankingData = async (
	page: number,
	limit: number,
): Promise<Ranking[]> => {
	const start = limit * page;
	const end = start + limit - 1;
	const { data } = await supabase
		.from("profiles_with_stats")
		.select("user_id, display_name, high_score, play_count, rank")
		.not("rank", "is", null)
		.order("rank", { ascending: true })
		.range(start, end);

	if (!data) return [];

	return data.map((x) => ({
		id: x.user_id,
		displayName: x.display_name,
		// biome-ignore lint/style/noNonNullAssertion: high_scoreがnullでないことはクエリで保証されている
		highScore: x.high_score!,
		// biome-ignore lint/style/noNonNullAssertion: rankがnullでないことはクエリで保証されている
		rank: x.rank!,
	}));
};

export function useFetchRanking(page = 0, limit = 20) {
	const getKey = (page: number, previousPageData: Ranking[] | null) => {
		if (previousPageData && previousPageData.length === 0) return null;
		return [page, limit];
	};

	const { data, error, isLoading, isValidating, size, setSize } =
		useSWRInfinite(getKey, ([page, limit]) => fetchRankingData(page, limit));

	const ranking = data ? data.flat() : [];

	const loadMore = () => setSize(size + 1);

	return {
		ranking,
		error,
		isLoading,
		isValidating,
		loadMore,
		hasMore: data?.[data.length - 1]?.length === limit,
	};
}

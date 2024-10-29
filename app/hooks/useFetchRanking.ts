import useSWRInfinite from "swr/infinite";
import { supabase } from "~/libs/supabase";

interface Stats {
	id: string;
	user_id: string;
	display_name: string;
	created_at: string;
	updated_at: string;
	high_score: number | null;
	play_count: number;
	rank: number | null;
}

const fetchRankingData = async (page: number, limit: number) => {
	const start = limit * page;
	const end = start + limit - 1;
	const { data } = await supabase
		.from("profiles_with_stats")
		.select("*")
		.order("rank", { ascending: true })
		.range(start, end);
	return data;
};

export function useFetchRanking(page = 0, limit = 20) {
	const getKey = (page: number, previousPageData: Stats[] | null) => {
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

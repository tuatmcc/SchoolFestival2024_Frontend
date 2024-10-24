import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "~/libs/supabase";

interface Stats{
    id: string;
    user_id: string;
    display_name: string;
    created_at: string;
    updated_at: string;
    high_score: number | null;
    play_count: number;
    rank: number | null;
};

export function useFetchRanking( limit = 20 ){
    const [ranking, setRanking] = useState<Stats[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const hasFetchedInitial = useRef(false);
    const scrollPosition = useRef(0);

    const fetchRankings = useCallback(async (fetchPage = page) => {
        setLoading(true);
        setError(false);

        const start = fetchPage * limit;
        const end = start + limit - 1;

        const { data, error } = await supabase
            .from('profiles_with_stats')
            .select('*')
            .order('rank', { ascending: true })
            .range(start, end);
        
        if(error){
            console.error('Error Fetching Rankings');
            setError(true);
        }
        else{
            setRanking((prev) => [...(prev ?? []), ...(data ?? [])])
        }

        setLoading(false);

        window.scrollTo(0, scrollPosition.current);
    }, [page, limit]);

    useEffect(() => {
        if(!hasFetchedInitial.current){
            fetchRankings(0);
            hasFetchedInitial.current = true;
        }
    })

    useEffect(() => {
        if(page > 0){
            fetchRankings(page);
        }
    }, [fetchRankings]);

    const loadMore = () => {
        scrollPosition.current = window.scrollY;
        setPage((prev) => prev + 1);
    };

    return { ranking, loading, error, loadMore };
}
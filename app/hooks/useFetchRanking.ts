import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "~/libs/supabase";
import useSWR from "swr";

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

const fetchRankingData = async(page: number, limit: number) => {
    const start = limit * page;
    const end = start + limit - 1;
    const { data } = await supabase
        .from('profiles_with_stats')
        .select('*')
        .order('rank', { ascending: true })
        .range(start, end);
    return data;
};

export function useFetchRanking( page = 0, limit = 20 ){
    const { data, error, isLoading } = useSWR([page, limit], ([page, limit]) => fetchRankingData(page, limit));

    return {
        data,
        error,
        isLoading
    };
}
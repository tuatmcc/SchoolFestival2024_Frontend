import { useEffect, useRef } from 'react';
import { useFetchRanking } from '~/hooks/useFetchRanking';
import '../Ranking.css'

interface RankingData{
    rank: number | null;
    name: string;
    score: number | null;
}

function RankingItem({ rank, name, score }: RankingData){
    const getRankClass = () => {
        if (rank === 1) return 'rank-first';
        if (rank === 2) return 'rank-second';
        if (rank === 3) return 'rank-third';
        return 'rank-default';
    };

    return (
        <div className='ranking-item'>
            <span className={`${getRankClass()}`}>{rank}位</span>
            <span className='name'>{name}</span>
            <span className='score'>{score}</span>
        </div>
    );
};

export function RankingList(){
    const { data, error, isLoading } = useFetchRanking();
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     if(loading || !loadMoreRef.current) return;

    //     const observerCallback = (entries: IntersectionObserverEntry[]) => {
    //         if(entries[0].isIntersecting){
    //             loadMore();
    //         }
    //     };

    //     observer.current = new IntersectionObserver(observerCallback);
    //     observer.current.observe(loadMoreRef.current);

    //     return () => {
    //         if(observer.current && loadMoreRef.current){
    //             observer.current.unobserve(loadMoreRef.current);
    //         }
    //     };
    // }, [loading, loadMore]);

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error!!</div>;

    if(!data || data.length === 0){
        return <div>No Ranking Data.</div>;
    }

    return (
        <div className='ranking-list'>
            <div className='ranking-title'>ランキング</div>
            {data.map((item, index) => (
                <RankingItem
                    key={item.user_id}
                    rank={item.rank}
                    name={item.display_name}
                    score={item.high_score}
                />
            ))}
            {/* <div ref={loadMoreRef}>
                {loading && <p className='ranking-loading-text'>Loading...</p>}
            </div> */}
        </div>
    );
}
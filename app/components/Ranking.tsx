import React from 'react';
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
    const { ranking, loading, error, loadMore } = useFetchRanking();

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error!!</div>;

    if(!ranking || ranking.length === 0){
        return <div>No Ranking Data.</div>;
    }

    return (
        <div className='ranking-list'>
            <div className='ranking-title'>ランキング</div>
            {ranking.map((item, index) => (
                <RankingItem
                    key={item.user_id}
                    rank={item.rank}
                    name={item.display_name}
                    score={item.high_score}
                />
            ))}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button className='ranking-load-button' onClick={loadMore}>Show More</button>
            )}
        </div>
    );
}
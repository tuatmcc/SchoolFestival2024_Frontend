import React from 'react';
import { useFetchRanking } from '~/hooks/useFetchRanking';
import '../Ranking.css'

interface RankingData{
    rank: number | null;
    name: string;
    score: number | null;
}

export function RankingItem({ rank, name, score }: RankingData){
    return (
        <div className='ranking-item'>
            <span className='rank'>{rank}位</span>
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
                <button onClick={loadMore}>Show More</button>
            )}
        </div>
    );
}
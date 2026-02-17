import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BigBlock from '../shared/Screen/BigBlock';

const Valorant = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_VALORANT_SCHEDULE_API;
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get('https://api.henrikdev.xyz/valorant/v1/esports/schedule', {
                    headers: {
                        'Authorization': API_KEY
                    }
                }
                );
                // console.log("Valorant schedule Data: ", response.data);
                setSchedule(response.data.data); // Correctly set the data array
                setLoading(false);
            } catch (err) {
                console.error("Error fetching schedule", err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const formatMatchData = (matchData) => {
        // Accessing the correct structure: matchData -> match -> teams
        const teamA = matchData.match.teams[0];
        const teamB = matchData.match.teams[1];

        let resultText = null;
        if (matchData.state === 'completed') {
            const winner = teamA.has_won ? teamA.name : (teamB.has_won ? teamB.name : null);
            if (winner) resultText = `${winner} won`;

        }
        return {
            matchTitle: `${teamA.name} vs ${teamB.name}`,
            venue: matchData.league.name,
            image: matchData.league.icon,

            status: matchData.state.charAt(0).toUpperCase() + matchData.state.slice(1),
            result: resultText,
            // Accessing teams from matchData.match.teams for the score
            score: matchData.match.teams.map(t => `${t.code}: ${t.game_wins}`).join(' | '),
            raw: matchData

        };
    };

    if (loading) {
        return (
            <div className="bg-black flex items-center justify-center p-10">
                <div className="text-white text-xl">Loading schedule...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-black flex items-center justify-center p-10">
                <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="w-full bg-black text-white p-6">
            <h1 className='text-3xl font-bold mb-6 text-center'>
                Valorant Esports Schedule
            </h1>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {schedule.map((matchData, index) => (
                    <BigBlock
                        key={matchData?.match?.id || index}
                        info={formatMatchData(matchData)}
                        onMatchSelect={(selectMatch) => console.log("Selected match", selectMatch)}
                        onWatchLive={() => {
                            if (matchData.vod) window.open(matchData.vod, '_blank');
                            else console.log("No VOD available or Live stream link needed");
                        }}
                    />
                ))}
            </div>
            {schedule.length === 0 && (
                <div className="text-center text-gray-500 mt-10">No matches found.</div>
            )}
        </div>
    )
}

export default Valorant;

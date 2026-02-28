import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// ESPN API endpoints - free, no auth needed
const SPORT_ENDPOINTS = [
    {
        sport: 'Basketball',
        icon: '🏀',
        league: 'NBA',
        url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
    },
    {
        sport: 'Football',
        icon: '🏈',
        league: 'NFL',
        url: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
    },
    {
        sport: 'Soccer',
        icon: '⚽',
        league: 'EPL',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
    },
    {
        sport: 'Cricket',
        icon: '🏏',
        league: 'International',
        url: 'https://site.api.espn.com/apis/site/v2/sports/cricket/scoreboard',
    },
    {
        sport: 'Baseball',
        icon: '⚾',
        league: 'MLB',
        url: 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
    },
    {
        sport: 'Hockey',
        icon: '🏒',
        league: 'NHL',
        url: 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard',
    },
    {
        sport: 'Tennis',
        icon: '🎾',
        league: 'ATP/WTA',
        url: 'https://site.api.espn.com/apis/site/v2/sports/tennis/scoreboard',
    },
];

const REFRESH_INTERVAL = 30000; // 30 seconds

/**
 * Formats a Date into YYYYMMDD for the ESPN API
 */
function formatDateParam(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

/**
 * Normalizes an ESPN event into a unified score object
 */
function normalizeEvent(event, sportConfig) {
    const competition = event.competitions?.[0];
    if (!competition) return null;

    const competitors = competition.competitors || [];
    const home = competitors.find((c) => c.homeAway === 'home') || competitors[0];
    const away = competitors.find((c) => c.homeAway === 'away') || competitors[1];

    if (!home || !away) return null;

    const status = competition.status || event.status || {};
    const statusType = status.type || {};

    // Determine game state
    let gameState = 'scheduled';
    if (statusType.state === 'in') gameState = 'live';
    else if (statusType.state === 'post') gameState = 'final';
    else gameState = 'scheduled';

    return {
        id: event.id,
        sport: sportConfig.sport,
        sportIcon: sportConfig.icon,
        league: sportConfig.league,
        homeTeam: {
            name: home.team?.shortDisplayName || home.team?.displayName || home.team?.name || 'TBD',
            abbreviation: home.team?.abbreviation || '',
            logo: home.team?.logo || '',
            score: home.score || '0',
            record: home.records?.find((r) => r.type === 'total')?.summary || '',
            color: home.team?.color ? `#${home.team.color}` : null,
        },
        awayTeam: {
            name: away.team?.shortDisplayName || away.team?.displayName || away.team?.name || 'TBD',
            abbreviation: away.team?.abbreviation || '',
            logo: away.team?.logo || '',
            score: away.score || '0',
            record: away.records?.find((r) => r.type === 'total')?.summary || '',
            color: away.team?.color ? `#${away.team.color}` : null,
        },
        gameState,
        statusDetail: statusType.shortDetail || statusType.detail || statusType.description || '',
        venue: competition.venue?.fullName || competition.venue?.displayName || '',
        broadcast: competition.broadcast || competition.broadcasts?.[0]?.names?.join(', ') || '',
        date: event.date,
        headline: competition.headlines?.[0]?.shortLinkText || event.shortName || event.name || '',
    };
}

/**
 * Normalizes a Valorant match into the same unified score format
 */
function normalizeValorantMatch(matchData) {
    const teamA = matchData.match?.teams?.[0];
    const teamB = matchData.match?.teams?.[1];
    if (!teamA || !teamB) return null;

    let gameState = 'scheduled';
    if (matchData.state === 'inprogress' || matchData.state === 'running') gameState = 'live';
    else if (matchData.state === 'completed') gameState = 'final';
    else gameState = 'scheduled';

    const statusMap = {
        completed: 'Final',
        inprogress: 'In Progress',
        running: 'In Progress',
        unstarted: 'Scheduled',
    };

    return {
        id: `val-${matchData.match?.id || Math.random()}`,
        sport: 'Valorant',
        sportIcon: '🎮',
        league: matchData.league?.name || 'VCT',
        homeTeam: {
            name: teamA.name || teamA.code || 'TBD',
            abbreviation: teamA.code || '',
            logo: teamA.icon || '',
            score: String(teamA.game_wins ?? 0),
            record: '',
            color: null,
        },
        awayTeam: {
            name: teamB.name || teamB.code || 'TBD',
            abbreviation: teamB.code || '',
            logo: teamB.icon || '',
            score: String(teamB.game_wins ?? 0),
            record: '',
            color: null,
        },
        gameState,
        statusDetail: statusMap[matchData.state] || matchData.state || '',
        venue: `Bo${matchData.match?.game_type?.count || '?'}`,
        broadcast: matchData.league?.region || '',
        date: matchData.date,
        headline: `${teamA.code || '?'} vs ${teamB.code || '?'}`,
    };
}

/**
 * Fetches Valorant esports schedule and filters by date
 */
async function fetchValorantScores(dateStr) {
    const API_KEY = import.meta.env.VITE_VALORANT_SCHEDULE_API;
    if (!API_KEY) return [];

    try {
        const response = await axios.get('https://api.henrikdev.xyz/valorant/v1/esports/schedule', {
            headers: { 'Authorization': API_KEY },
            timeout: 8000,
        });

        const allMatches = response.data?.data || [];

        // Filter matches for the selected date
        const filtered = allMatches.filter((match) => {
            const matchDate = new Date(match.date).toISOString().split('T')[0];
            return matchDate === dateStr;
        });

        return filtered
            .map(normalizeValorantMatch)
            .filter(Boolean);
    } catch (err) {
        console.warn('Valorant API error (non-blocking):', err.message);
        return [];
    }
}

/**
 * @param {Date} selectedDate - The date to fetch scores for
 */
export default function useLiveScores(selectedDate = new Date()) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const intervalRef = useRef(null);

    const dateKey = formatDateParam(selectedDate);
    const isoDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    // Check if selected date is today
    const isToday =
        selectedDate.toDateString() === new Date().toDateString();

    const fetchScores = useCallback(async () => {
        try {
            // Fetch ESPN sports + Valorant esports in parallel
            const [espnResults, valorantScores] = await Promise.all([
                Promise.allSettled(
                    SPORT_ENDPOINTS.map((ep) => {
                        const separator = ep.url.includes('?') ? '&' : '?';
                        const url = `${ep.url}${separator}dates=${dateKey}`;
                        return axios.get(url, { timeout: 8000 }).then((res) => ({
                            config: ep,
                            data: res.data,
                        }));
                    })
                ),
                fetchValorantScores(isoDate),
            ]);

            const allScores = [];

            // Process ESPN results
            espnResults.forEach((result) => {
                if (result.status !== 'fulfilled') return;
                const { config, data } = result.value;
                const events = data.events || [];

                events.forEach((event) => {
                    const normalized = normalizeEvent(event, config);
                    if (normalized) allScores.push(normalized);
                });
            });

            // Add Valorant results
            allScores.push(...valorantScores);

            // Sort: live games first, then scheduled, then completed
            const stateOrder = { live: 0, scheduled: 1, final: 2 };
            allScores.sort((a, b) => (stateOrder[a.gameState] ?? 3) - (stateOrder[b.gameState] ?? 3));

            setScores(allScores);
            setError(null);
            setLastUpdated(new Date());
        } catch (err) {
            setError('Failed to fetch scores. Please try again.');
            console.error('useLiveScores error:', err);
        } finally {
            setLoading(false);
        }
    }, [dateKey, isoDate]);

    useEffect(() => {
        setLoading(true);
        setScores([]);
        fetchScores();

        // Only auto-refresh if viewing today's date
        if (isToday) {
            intervalRef.current = setInterval(fetchScores, REFRESH_INTERVAL);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fetchScores, isToday]);

    const refresh = useCallback(() => {
        setLoading(true);
        fetchScores();
    }, [fetchScores]);

    // Group scores by sport
    const groupedScores = scores.reduce((acc, score) => {
        if (!acc[score.sport]) acc[score.sport] = [];
        acc[score.sport].push(score);
        return acc;
    }, {});

    // Get unique sports that have scores
    const availableSports = [...new Set(scores.map((s) => s.sport))];

    return { scores, groupedScores, availableSports, loading, error, lastUpdated, refresh, isToday };
}

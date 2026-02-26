import { useState, useEffect } from "react";
import axios from "axios";

const SPORTS_DB_BASE = "https://www.thesportsdb.com/api/v1/json/3";
const FREE_TO_GAME_API = "/api/freetogame/games"; // Proxied via Vite to avoid CORS

// Popular league IDs from TheSportsDB (for sports & home categories)
const LEAGUE_IDS = {
    sports: [4328, 4331, 4335, 4346, 4387, 4424], // EPL, Bundesliga, La Liga, UFC, NBA, NFL
    home: [4328, 4335, 4346, 4387, 4424, 4331],   // Mix of popular leagues
};

// Fallback images in case the API fails
const FALLBACK_IMAGES = {
    sports: [
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80",
    ],
    games: [
        "/game4.jpg",
        "/game2.jpg",
        "/game3.jpg",
        "/game1.jpg",
        "/game5.jpg",
        "/game6.jpg",
    ],
    home: [
        "/game4.jpg",
        "/game2.jpg",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    ],
};

/**
 * Fetch sports banners (fanart + banner) from TheSportsDB
 */
const fetchSportsBanners = async (leagueIds) => {
    const responses = await Promise.allSettled(
        leagueIds.map((id) =>
            axios.get(`${SPORTS_DB_BASE}/lookupleague.php?id=${id}`)
        )
    );

    const bannerUrls = [];
    responses.forEach((result) => {
        if (result.status === "fulfilled" && result.value.data?.leagues) {
            const league = result.value.data.leagues[0];
            // Collect only fanart & banner images
            if (league.strFanart1) bannerUrls.push(league.strFanart1);
            if (league.strFanart2) bannerUrls.push(league.strFanart2);
            if (league.strFanart3) bannerUrls.push(league.strFanart3);
            if (league.strFanart4) bannerUrls.push(league.strFanart4);
            if (league.strBanner) bannerUrls.push(league.strBanner);
        }
    });

    return bannerUrls;
};

/**
 * Fetch high-res game screenshots from the FreeToGame API.
 * Step 1: Get popular games list for their IDs
 * Step 2: Fetch each game's detail page for full-size screenshots (~1280px)
 */
const fetchGameBanners = async () => {
    // Get the top popular game IDs
    const listResponse = await axios.get(`${FREE_TO_GAME_API}?sort-by=popularity`);
    const games = listResponse.data || [];
    const topGameIds = games.slice(0, 8).map((game) => game.id);

    // Fetch detail pages in parallel to get screenshots
    const detailResponses = await Promise.allSettled(
        topGameIds.map((id) =>
            axios.get(`/api/freetogame/game?id=${id}`)
        )
    );

    const screenshotUrls = [];
    detailResponses.forEach((result) => {
        if (result.status === "fulfilled" && result.value.data?.screenshots) {
            // Take the first screenshot from each game (highest quality)
            const shots = result.value.data.screenshots;
            if (shots.length > 0) {
                screenshotUrls.push(shots[0].image);
            }
        }
    });

    return screenshotUrls;
};

/**
 * Custom hook to fetch banner images from free APIs.
 * - Sports & Home: TheSportsDB (fanart + banners)
 * - Games: FreeToGame API (game thumbnails sorted by popularity)
 *
 * @param {"sports" | "games" | "home"} category
 * @returns {{ images: string[], loading: boolean, error: string | null }}
 */
const useBannerImages = (category = "home") => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchBanners = async () => {
            try {
                setLoading(true);
                setError(null);

                let bannerUrls = [];

                if (category === "games") {
                    // Use FreeToGame API for gaming banners only
                    bannerUrls = await fetchGameBanners();
                } else if (category === "sports") {
                    // Use TheSportsDB for sports-only banners
                    bannerUrls = await fetchSportsBanners(LEAGUE_IDS.sports);
                } else {
                    // Home: combine both sports + gaming banners
                    const [sportUrls, gameUrls] = await Promise.all([
                        fetchSportsBanners(LEAGUE_IDS.home),
                        fetchGameBanners(),
                    ]);
                    bannerUrls = [...sportUrls, ...gameUrls];
                }

                if (cancelled) return;

                if (bannerUrls.length > 0) {
                    // Shuffle and cap at 8 images for smooth carousel
                    const shuffled = bannerUrls.sort(() => Math.random() - 0.5);
                    setImages(shuffled.slice(0, 8));
                } else {
                    setImages(FALLBACK_IMAGES[category] || FALLBACK_IMAGES.home);
                }
            } catch (err) {
                if (cancelled) return;
                console.error("Failed to fetch banner images:", err);
                setError(err.message);
                setImages(FALLBACK_IMAGES[category] || FALLBACK_IMAGES.home);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchBanners();

        return () => {
            cancelled = true;
        };
    }, [category]);

    return { images, loading, error };
};

export default useBannerImages;

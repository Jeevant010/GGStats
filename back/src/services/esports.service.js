const { HLTV } = require('hltv');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCS2Matches = async () => {
    const maxAttempts = 3;
    const timeoutMs = 8000;
    let matches = [];

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let timeoutId;
        try {
            const fetchPromise = HLTV.getMatches();
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    reject(new Error(`HLTV.getMatches request timeout after ${timeoutMs}ms`));
                }, timeoutMs);
            });

            matches = await Promise.race([fetchPromise, timeoutPromise]);
            clearTimeout(timeoutId);
            break;
        } catch (err) {
            if (timeoutId) clearTimeout(timeoutId);
            console.error(`Attempt ${attempt} failed fetching CS2 matches:`, err.message);
            if (attempt === maxAttempts) {
                console.warn("Max attempts reached. Returning safe fallback empty array.");
                matches = [];
            } else {
                await delay(attempt * 1000);
            }
        }
    }

    const limitedMatches = Array.isArray(matches) ? matches.slice(0, 50) : [];
    return limitedMatches;
};

module.exports = { getCS2Matches };

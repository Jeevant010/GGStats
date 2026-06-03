const { HLTV } = require('hltv');

const getCS2Matches = async () => {
    // Fetch matches from HLTV
    const matches = await HLTV.getMatches();

    const limitedMatches = matches.slice(0, 50);

    return limitedMatches;
};

module.exports = { getCS2Matches };

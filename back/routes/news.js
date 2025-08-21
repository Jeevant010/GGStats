const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const NEWS_API_KEY = "a90297fb0e554032ac48ff512ced53e7";

router.get('/news', async (req, res) =>{
    const query = req.query.q || 'Sport';
    try{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`);
        const data = await response.json();
        res.json(data.articles);
    } catch(err){
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});
module.exports = router;

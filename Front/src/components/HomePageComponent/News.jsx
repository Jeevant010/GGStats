import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
const News = () => {

    const [search, setSearch] = useState("Sport");
    const [newsData, setNewsData] = useState([]);
    const API_KEY = "a90297fb0e554032ac48ff512ced53e7";

    const getDATA = async (query = search) => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const jsondata = await response.json();
        console.log(jsondata.articles);
        setNewsData(jsondata.articles);
    };

    useEffect(() => {
        getDATA("Sport");
    }, []);
    const handleInput = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    }
    return (
        
        <div className="w-full max-w-full mx-auto p-4 bg-white/80 rounded-xl shadow-lg mt-8">
            <form
                className="flex flex-col sm:flex-row items-center gap-3 mb-6"
                onSubmit={e => {
                e.preventDefault();
                getDATA();
                return false;
            }}
        >
            <input
                type='text'
                placeholder='Search News'
                onChange={handleInput}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white shadow"
            />
            <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors"
            >
                Search
            </button>
        </form>
        <h1 className='news-header font-bold text-2xl flex justify-start my-4 '>Latest News</h1>
        <NewsCard data={newsData}/>
    </div>
  )
}

export default News;
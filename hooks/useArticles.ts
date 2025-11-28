import { useState, useEffect } from 'react';
import { HERO_ARTICLES, GRID_ARTICLES } from '../constants';
import { Article } from '../types';

export const useArticles = () => {
    const [heroArticles, setHeroArticles] = useState<Article[]>([]);
    const [gridArticles, setGridArticles] = useState<Article[]>([]);
    const [allArticles, setAllArticles] = useState<Article[]>([]);

    useEffect(() => {
        // Load custom articles from local storage
        const stored = localStorage.getItem('customArticles');
        const customArticles: Article[] = stored ? JSON.parse(stored) : [];

        // Distribute articles
        // If we have custom articles, use the most recent one for Hero
        if (customArticles.length > 0) {
            setHeroArticles([customArticles[0]]);
            setGridArticles(customArticles.slice(1));
            setAllArticles(customArticles);
        } else {
            // Fallback to constants (which are now empty, but good for future proofing)
            setHeroArticles(HERO_ARTICLES);
            setGridArticles(GRID_ARTICLES);
            setAllArticles([...HERO_ARTICLES, ...GRID_ARTICLES]);
        }
    }, []);

    return { heroArticles, gridArticles, allArticles };
};

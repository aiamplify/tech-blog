import { useState, useEffect, useCallback } from 'react';
import { HERO_ARTICLES, GRID_ARTICLES } from '../constants';
import { Article } from '../types';

export const useArticles = () => {
    const [heroArticles, setHeroArticles] = useState<Article[]>([]);
    const [gridArticles, setGridArticles] = useState<Article[]>([]);
    const [allArticles, setAllArticles] = useState<Article[]>([]);

    const loadArticles = useCallback(() => {
        // Load custom articles from local storage
        const stored = localStorage.getItem('customArticles');
        const customArticles: Article[] = stored ? JSON.parse(stored) : [];

        // Filter to only show published articles on the public site
        const publishedArticles = customArticles.filter(article => article.status === 'published');

        // Distribute articles
        // If we have published articles, use the most recent one for Hero
        if (publishedArticles.length > 0) {
            setHeroArticles([publishedArticles[0]]);
            setGridArticles(publishedArticles.slice(1));
            setAllArticles(publishedArticles);
        } else {
            // Fallback to constants (which are now empty, but good for future proofing)
            setHeroArticles(HERO_ARTICLES);
            setGridArticles(GRID_ARTICLES);
            setAllArticles([...HERO_ARTICLES, ...GRID_ARTICLES]);
        }
    }, []);

    useEffect(() => {
        // Initial load
        loadArticles();

        // Listen for storage changes (when articles are saved in admin)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'customArticles') {
                loadArticles();
            }
        };

        // Listen for custom event (for same-tab updates)
        const handleArticlesUpdated = () => {
            loadArticles();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('articlesUpdated', handleArticlesUpdated);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('articlesUpdated', handleArticlesUpdated);
        };
    }, [loadArticles]);

    // Expose refresh function for manual refresh
    const refreshArticles = loadArticles;

    return { heroArticles, gridArticles, allArticles, refreshArticles };
};

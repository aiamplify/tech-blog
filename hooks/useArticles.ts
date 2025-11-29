import { useState, useEffect, useCallback } from 'react';
import { HERO_ARTICLES, GRID_ARTICLES } from '../constants';
import { Article } from '../types';

export const useArticles = () => {
    const [heroArticles, setHeroArticles] = useState<Article[]>([]);
    const [gridArticles, setGridArticles] = useState<Article[]>([]);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [, setUpdateCounter] = useState(0); // Force re-render trigger

    const loadArticles = useCallback(() => {
        console.log("📚 Loading articles from localStorage...");
        
        // Load custom articles from local storage
        const stored = localStorage.getItem('customArticles');
        const customArticles: Article[] = stored ? JSON.parse(stored) : [];
        
        console.log("📦 Total articles in storage:", customArticles.length);
        console.log("📦 Articles:", customArticles.map(a => ({ id: a.id, title: a.title, status: a.status })));

        // Filter to only show published articles on the public site
        const publishedArticles = customArticles.filter(article => article.status === 'published');
        
        console.log("✅ Published articles:", publishedArticles.length);

        // Distribute articles
        // If we have published articles, use the most recent one for Hero
        if (publishedArticles.length > 0) {
            console.log("🎯 Setting hero article:", publishedArticles[0].title);
            setHeroArticles([publishedArticles[0]]);
            setGridArticles(publishedArticles.slice(1));
            setAllArticles(publishedArticles);
        } else {
            console.log("⚠️ No published articles found, using fallback");
            // Fallback to constants (which are now empty, but good for future proofing)
            setHeroArticles(HERO_ARTICLES);
            setGridArticles(GRID_ARTICLES);
            setAllArticles([...HERO_ARTICLES, ...GRID_ARTICLES]);
        }
        
        // Force a re-render
        setUpdateCounter(c => c + 1);
    }, []);

    useEffect(() => {
        console.log("🔄 useArticles hook mounted, loading articles...");
        
        // Initial load
        loadArticles();

        // Listen for storage changes (when articles are saved in admin)
        const handleStorageChange = (e: StorageEvent) => {
            console.log("💾 Storage change detected:", e.key);
            if (e.key === 'customArticles') {
                loadArticles();
            }
        };

        // Listen for custom event (for same-tab updates)
        const handleArticlesUpdated = () => {
            console.log("📢 articlesUpdated event received!");
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

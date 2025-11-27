import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';

const ArticleGrid: React.FC = () => {
  const { gridArticles } = useArticles();
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="bg-surface-dark border border-gray-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-glow group"
          >
            <div className="overflow-hidden h-48">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-6 relative">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl"></div>

              <p className="text-xs font-bold text-primary mb-3 uppercase tracking-widest">
                {article.category}
              </p>
              <h3 className="text-xl font-display font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700/50 pt-4">
                <span>{article.date}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">Read &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticleGrid;

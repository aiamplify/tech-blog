import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { Clock, Eye, Bookmark, Share2, ArrowRight, Filter, Grid, List, Sparkles } from 'lucide-react';

const ArticleGrid: React.FC = () => {
  const { gridArticles } = useArticles();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(gridArticles.map(a => a.category)))];

  // Filter articles
  const filteredArticles = selectedCategory === 'All' 
    ? gridArticles 
    : gridArticles.filter(a => a.category === selectedCategory);

  if (gridArticles.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass mb-6">
            <Sparkles className="h-10 w-10 text-primary-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">No Articles Yet</h2>
          <p className="text-dark-400 mb-8 max-w-md mx-auto">
            Start creating amazing content with our AI-powered editor. Your articles will appear here.
          </p>
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Create Your First Article
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Latest Articles</h2>
          <p className="text-dark-400">Discover the latest insights and stories</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'glass text-dark-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl glass">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group relative glass rounded-2xl overflow-hidden card-hover"
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className={`absolute top-4 right-4 flex items-center gap-2 transition-all duration-300 ${
                  hoveredId === article.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
                  >
                    <Bookmark className="h-4 w-4 text-white" />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                  {article.title}
                </h3>
                
                {article.excerpt && (
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{Math.floor(Math.random() * 3000 + 500)}</span>
                    </div>
                  </div>
                  
                  <span className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.1), transparent 40%)'
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group flex gap-6 glass rounded-2xl p-4 card-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-primary-500/20 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-dark-500">{article.date}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {article.title}
                </h3>
                
                {article.excerpt && (
                  <p className="text-dark-400 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-dark-400 hover:text-white"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-dark-400 hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1 text-primary-400 text-sm font-medium">
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredArticles.length > 6 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold btn-secondary text-dark-300 hover:text-white">
            Load More Articles
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleGrid;

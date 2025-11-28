import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Clock, Eye, ChevronLeft, ChevronRight, BookOpen, Rss } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const Hero: React.FC = () => {
  const { heroArticles, gridArticles } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || heroArticles.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroArticles.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroArticles.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? heroArticles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === heroArticles.length - 1 ? 0 : prev + 1));
  };

  const article = heroArticles[currentIndex];
  const trendingArticles = gridArticles.slice(0, 3);

  // Empty state - Blog welcome message (not app marketing)
  if (!article) {
    return (
      <section className="relative overflow-hidden">
        {/* Welcome Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-white/5">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />

          <div className="relative z-10 py-16 px-8 md:py-24 md:px-16">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Rss className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-medium text-dark-300">AI Amplify Blog</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Welcome to <span className="text-gradient">AI Amplify</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-dark-400 mb-8 max-w-2xl leading-relaxed">
                Your source for the latest insights on artificial intelligence, technology trends, 
                and innovation. Discover articles, tutorials, and thought leadership from the world of tech.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { icon: BookOpen, label: 'In-depth Articles' },
                  { icon: Sparkles, label: 'AI Insights' },
                  { icon: TrendingUp, label: 'Tech Trends' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-dark-300">
                    <item.icon className="h-5 w-5 text-primary-400" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA - Only for logged in admin */}
              <p className="text-dark-500 text-sm">
                No articles yet. Check back soon for new content!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Main Hero */}
      <div className="relative min-h-[70vh] overflow-hidden rounded-3xl">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url('${article.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full min-h-[70vh] flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl animate-slide-up">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <TrendingUp className="h-4 w-4 text-accent-emerald" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            )}

            {/* Meta & CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to={`/article/${article.id}`}
                className="group flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold"
              >
                Read Article
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{Math.floor(Math.random() * 5000 + 1000)} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {heroArticles.length > 1 && (
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {heroArticles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'w-8 bg-primary-500 shadow-glow' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trending Section */}
      {trendingArticles.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingArticles.map((item, idx) => (
            <Link
              key={item.id}
              to={`/article/${item.id}`}
              className="group relative glass rounded-2xl p-6 card-hover overflow-hidden"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-400">0{idx + 1}</span>
              </div>

              {/* Content */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold mt-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-dark-500">
                    <Clock className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;

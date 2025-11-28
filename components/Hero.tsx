import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, TrendingUp, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Empty state
  if (!article) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-dark-300">AI-Powered Content Studio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Create <span className="text-gradient">Stunning</span> Content with AI
          </h1>
          
          <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into professional blog posts in seconds. Powered by advanced AI, designed for creators.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/admin" 
              className="group flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              <Sparkles className="h-5 w-5" />
              Start Creating
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-dark-300 hover:text-white btn-secondary">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="h-4 w-4 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '10K+', label: 'Articles Created' },
              { value: '50+', label: 'AI Templates' },
              { value: '99%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-display font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-dark-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />
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

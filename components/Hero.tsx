import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const Hero: React.FC = () => {
  const { heroArticles } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroArticles.length - 1 ? 0 : prev + 1));
    }, 8000); // Auto slide every 8 seconds
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroArticles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === heroArticles.length - 1 ? 0 : prev + 1));
  };

  const article = heroArticles[currentIndex];

  if (!article) {
    return (
      <section className="mb-16 relative h-[300px] rounded-2xl bg-surface-dark border border-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-gray-500 mb-2">No Featured Articles</h2>
          <p className="text-gray-600">Create a new post in the Studio to see it here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16 group relative">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
        <div
          className="relative h-[500px] w-full bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${article.imageUrl}')` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white max-w-4xl">
            <div className="transform transition-all duration-500 translate-y-0 opacity-100">
              <p className="font-display text-sm tracking-[0.2em] text-primary text-glow uppercase mb-3 font-bold">
                {article.category}
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-glow leading-tight">
                {article.title}
              </h1>
              <p className="text-gray-300 mb-8 font-light tracking-wide border-l-2 border-primary pl-4">
                {article.date}
              </p>
              <Link
                to={`/article/${article.id}`}
                className="bg-primary text-white font-bold py-3 px-8 rounded-full self-start hover:bg-white hover:text-background-dark transition-all shadow-lg shadow-primary/30 hover:shadow-white/20"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-3 z-10">
        {heroArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary shadow-glow' : 'w-2 bg-gray-600 hover:bg-primary/50'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface-dark/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-white/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-dark/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-white/10"
      >
        <ArrowRight className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;

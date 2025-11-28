import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Tag, Clock, Eye, Share2, Bookmark, 
  Heart, MessageSquare, ChevronUp, Twitter, Facebook, Linkedin,
  Copy, Check, User
} from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allArticles, gridArticles } = useArticles();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = allArticles.find((a) => a.id === id);
    setArticle(found);
    window.scrollTo(0, 0);
  }, [id, allArticles]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedArticles = gridArticles
    .filter(a => a.id !== id && a.category === article?.category)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mx-auto mb-6">
            <Tag className="h-10 w-10 text-dark-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-4">Article Not Found</h2>
          <p className="text-dark-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = article.content?.split(/\s+/).filter(Boolean).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen pb-20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-dark-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/20" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 glass text-white px-4 py-2.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-4xl">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 rounded-xl glass text-sm font-semibold text-white uppercase tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-dark-300 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {Math.floor(Math.random() * 5000 + 1000)} views
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">AI Amplify</p>
                <p className="text-dark-400 text-sm">Tech & AI Insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Action Bar */}
          <div className="glass rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl transition-all ${
                  isLiked ? 'bg-accent-rose/20 text-accent-rose' : 'hover:bg-white/5 text-dark-400 hover:text-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-xl hover:bg-white/5 text-dark-400 hover:text-white transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl transition-all ${
                  isBookmarked ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-white/5 text-dark-400 hover:text-white'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-dark-300 hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>

              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 glass rounded-xl p-2 w-48 animate-scale-in z-20">
                  <button 
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 text-accent-emerald" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-dark-300 hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <div className="glass rounded-2xl p-8 mb-8">
              <p className="text-xl text-dark-200 leading-relaxed italic border-l-4 border-primary-500 pl-6">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Article Content */}
          <article className="glass rounded-2xl p-8 md:p-12">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Content not available.</p>' }}
            />
          </article>

          {/* Tags */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="h-4 w-4 text-dark-500" />
              {article.keywords.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg glass text-sm text-dark-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Card */}
          <div className="mt-12 glass rounded-2xl p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-white mb-2">AI Amplify</h3>
                <p className="text-dark-400 mb-4">
                  Exploring the intersection of technology, artificial intelligence, and innovation. Stay updated with the latest trends, tutorials, and insights from the world of tech.
                </p>
                <div className="flex items-center gap-3">
                  <button className="btn-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
                    Follow
                  </button>
                  <button className="px-4 py-2 rounded-xl glass text-dark-300 hover:text-white text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/article/${related.id}`}
                    className="group glass rounded-2xl overflow-hidden card-hover"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                        {related.category}
                      </span>
                      <h3 className="text-white font-semibold mt-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-xs text-dark-500 mt-2">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {readingProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-2xl btn-primary text-white shadow-glow-lg animate-fade-in z-40"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </main>
  );
};

export default ArticleDetail;

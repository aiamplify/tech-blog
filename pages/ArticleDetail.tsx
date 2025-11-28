import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allArticles } = useArticles();
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    const found = allArticles.find((a) => a.id === id);
    setArticle(found);

    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [id, allArticles]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white font-display">Article not found</h2>
        <Link to="/" className="text-primary mt-4 inline-block hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <main className="flex-grow bg-background-dark">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <Link
            to="/"
            className="inline-flex items-center text-white bg-black/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-primary transition-all shadow-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-surface-dark border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm">
                <Tag className="h-4 w-4" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed font-light border-l-4 border-primary pl-6 italic">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-surface-dark border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Content not available.</p>' }}
            />
          </div>
        </article>
      </div>

      {/* Styling for article content */}
      <style jsx>{`
        .article-content {
          color: #d1d5db;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        
        .article-content h2 {
          color: #ffffff;
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-family: 'Orbitron', sans-serif;
          border-bottom: 3px solid #00aaff;
          padding-bottom: 0.75rem;
          line-height: 1.3;
        }
        
        .article-content h2:first-child {
          margin-top: 0;
        }
        
        .article-content h3 {
          color: #e5e7eb;
          font-size: 1.75rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          font-family: 'Orbitron', sans-serif;
          line-height: 1.4;
        }
        
        .article-content h4 {
          color: #e5e7eb;
          font-size: 1.375rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .article-content p {
          margin-bottom: 1.75rem;
          color: #d1d5db;
          line-height: 1.8;
        }
        
        .article-content strong {
          color: #00aaff;
          font-weight: 700;
        }
        
        .article-content em {
          color: #a5b4fc;
          font-style: italic;
        }
        
        .article-content ul, .article-content ol {
          margin-left: 2rem;
          margin-bottom: 2rem;
          color: #d1d5db;
        }
        
        .article-content ul {
          list-style-type: disc;
        }
        
        .article-content ol {
          list-style-type: decimal;
        }
        
        .article-content li {
          margin-bottom: 1rem;
          padding-left: 0.5rem;
          line-height: 1.8;
        }
        
        .article-content li::marker {
          color: #00aaff;
          font-weight: bold;
        }
        
        .article-content blockquote {
          border-left: 4px solid #00aaff;
          padding-left: 2rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: #e5e7eb;
          background: rgba(0, 170, 255, 0.05);
          padding: 2rem;
          border-radius: 0.5rem;
          font-size: 1.25rem;
          line-height: 1.8;
        }
        
        .article-content a {
          color: #00aaff;
          text-decoration: underline;
          transition: color 0.2s;
          font-weight: 500;
        }
        
        .article-content a:hover {
          color: #60a5fa;
        }
        
        .article-content code {
          background: #1e293b;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          color: #00aaff;
          font-size: 0.95em;
        }
        
        .article-content pre {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid #334155;
        }
        
        .article-content pre code {
          background: transparent;
          padding: 0;
          font-size: 0.9rem;
        }
        
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
        
        .article-content hr {
          border: none;
          border-top: 2px solid #374151;
          margin: 3rem 0;
        }
        
        /* First paragraph special styling */
        .article-content > p:first-of-type {
          font-size: 1.25rem;
          color: #e5e7eb;
          line-height: 1.9;
        }
      `}</style>
    </main>
  );
};

export default ArticleDetail;

import React from 'react';
import Hero from '../components/Hero';
import ArticleGrid from '../components/ArticleGrid';
import Newsletter from '../components/Newsletter';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, ArrowRight, Sparkles, BookOpen, Users, Coffee } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const Home: React.FC = () => {
  const { gridArticles } = useArticles();
  
  // Get featured/latest articles for sidebar
  const latestArticles = gridArticles.slice(0, 5);
  const categories = ['Technology', 'AI', 'Innovation', 'Hardware', 'Software', 'Security', 'Startups', 'Reviews'];
  
  // Calculate category counts
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: gridArticles.filter(a => a.category === cat).length
  })).filter(c => c.count > 0);

  return (
    <main className="flex-grow">
      {/* Hero Section - Featured Articles */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Articles Column */}
          <div className="flex-1">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-500/20">
                  <BookOpen className="h-5 w-5 text-primary-400" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white">Latest Articles</h2>
              </div>
              <Link 
                to="/resources" 
                className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Article Grid */}
            <ArticleGrid />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            {/* About the Blog */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white">AI Amplify</h3>
                  <p className="text-sm text-dark-400">Tech & AI Insights</p>
                </div>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed mb-4">
                Exploring the intersection of technology, artificial intelligence, and innovation. 
                Stay updated with the latest trends, tutorials, and insights.
              </p>
              <div className="flex items-center gap-4 text-sm text-dark-400">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>5K+ Readers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="h-4 w-4" />
                  <span>{gridArticles.length} Articles</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            {categoryCounts.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-400" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categoryCounts.map((cat) => (
                    <button
                      key={cat.name}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-dark-300 group-hover:text-white transition-colors">{cat.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-dark-800 text-dark-400 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Posts */}
            {latestArticles.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent-amber" />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {latestArticles.slice(0, 4).map((article, idx) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-2xl font-display font-bold text-dark-700 group-hover:text-primary-500 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-dark-200 group-hover:text-white transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-dark-500">
                          <Clock className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[50px]" />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-sm text-dark-400 mb-4">
                  Get the latest articles delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full input-glass rounded-xl px-4 py-3 text-sm text-white placeholder-dark-500"
                  />
                  <button
                    type="submit"
                    className="w-full btn-primary text-white py-3 rounded-xl font-semibold text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Machine Learning', 'Web Dev', 'React', 'Python', 'Cloud', 'DevOps', 'Security', 'Startups', 'Innovation'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-dark-800 text-dark-300 text-xs hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Home;

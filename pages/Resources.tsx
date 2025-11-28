import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, FileText, Video, Download, ExternalLink, Search,
  Sparkles, Code, Palette, Target, Zap, ArrowRight, Play,
  ChevronRight, Star, Clock, Users
} from 'lucide-react';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'guides', label: 'Guides', icon: FileText },
    { id: 'tutorials', label: 'Tutorials', icon: Video },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'api', label: 'API Docs', icon: Code },
  ];

  const resources = [
    {
      id: 1,
      category: 'guides',
      title: 'Getting Started with TechPulse',
      description: 'Learn the basics of creating content with our AI-powered platform.',
      icon: Sparkles,
      readTime: '5 min read',
      type: 'Guide',
      featured: true
    },
    {
      id: 2,
      category: 'tutorials',
      title: 'Mastering AI Content Generation',
      description: 'Advanced techniques for getting the best results from our AI writer.',
      icon: Zap,
      readTime: '10 min read',
      type: 'Tutorial',
      featured: true
    },
    {
      id: 3,
      category: 'guides',
      title: 'SEO Best Practices',
      description: 'Optimize your content for search engines with these proven strategies.',
      icon: Target,
      readTime: '8 min read',
      type: 'Guide',
      featured: false
    },
    {
      id: 4,
      category: 'templates',
      title: 'Blog Post Templates',
      description: 'Ready-to-use templates for various blog post formats.',
      icon: FileText,
      readTime: '3 min read',
      type: 'Template Pack',
      featured: false
    },
    {
      id: 5,
      category: 'api',
      title: 'API Documentation',
      description: 'Complete reference for integrating TechPulse into your applications.',
      icon: Code,
      readTime: '15 min read',
      type: 'Documentation',
      featured: false
    },
    {
      id: 6,
      category: 'tutorials',
      title: 'Creating Engaging Headlines',
      description: 'Learn how to craft headlines that capture attention and drive clicks.',
      icon: Palette,
      readTime: '6 min read',
      type: 'Tutorial',
      featured: false
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(r => r.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-dark-300 mb-6">
              <BookOpen className="h-4 w-4 text-primary-400" />
              Learning Center
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Resources & <span className="text-gradient">Documentation</span>
            </h1>
            <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">
              Everything you need to master content creation with TechPulse. Guides, tutorials, templates, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full input-glass rounded-2xl pl-14 pr-6 py-4 text-white placeholder-dark-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="group glass rounded-2xl p-8 card-hover relative overflow-hidden">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary-500/20 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                        {resource.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-dark-500">
                        <Clock className="h-3 w-3" />
                        {resource.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-dark-400 mb-4">{resource.description}</p>
                    <button className="flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Star badge */}
                <div className="absolute top-4 right-4">
                  <Star className="h-5 w-5 text-accent-amber fill-accent-amber" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter & Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'glass text-dark-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="group glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                    <resource.icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                      {resource.type}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-dark-500">
                      <Clock className="h-3 w-3" />
                      {resource.readTime}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-dark-400 text-sm mb-4">{resource.description}</p>
                <button className="flex items-center gap-2 text-sm text-primary-400 font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-dark-500" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">No Resources Found</h3>
              <p className="text-dark-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Video Tutorials</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Watch step-by-step tutorials to get the most out of TechPulse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Quick Start Guide', duration: '5:30', views: '12K' },
              { title: 'Advanced AI Features', duration: '12:45', views: '8K' },
              { title: 'SEO Optimization Tips', duration: '8:20', views: '6K' },
            ].map((video, idx) => (
              <div key={idx} className="group glass rounded-2xl overflow-hidden card-hover">
                <div className="relative h-48 bg-dark-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-dark-950/80 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {video.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-cyan/20 rounded-full blur-[80px]" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Can't Find What You Need?
              </h2>
              <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
                Our support team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold"
              >
                Contact Support
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Sparkles, ChevronDown, Bell, User, Settings, LogOut, Zap, BookOpen, Layers, MessageSquare } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const megaMenuItems = [
    {
      title: 'Create',
      icon: Sparkles,
      items: [
        { label: 'AI Blog Writer', href: '/admin', description: 'Generate articles with AI' },
        { label: 'Templates', href: '/admin', description: 'Start from pre-built templates' },
        { label: 'Import Content', href: '/admin', description: 'Import from other platforms' },
      ]
    },
    {
      title: 'Explore',
      icon: BookOpen,
      items: [
        { label: 'Latest Articles', href: '/', description: 'Browse recent content' },
        { label: 'Categories', href: '/resources', description: 'Explore by topic' },
        { label: 'Trending', href: '/', description: 'Most popular content' },
      ]
    },
    {
      title: 'Learn',
      icon: Layers,
      items: [
        { label: 'Documentation', href: '/resources', description: 'How to use the platform' },
        { label: 'API Reference', href: '/resources', description: 'Developer resources' },
        { label: 'Best Practices', href: '/resources', description: 'Content creation tips' },
      ]
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-dark shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-violet blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-white group-hover:text-gradient transition-all duration-300">
                  AI Amplify
                </span>
                <span className="text-[10px] font-medium text-dark-400 uppercase tracking-widest">
                  Tech & AI Insights
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500 shadow-glow" />
                  )}
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              
              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-dark-400 hover:text-white transition-colors rounded-lg">
                  More
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Mega Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="glass rounded-2xl p-6 shadow-glass min-w-[600px] grid grid-cols-3 gap-6">
                    {megaMenuItems.map((section) => (
                      <div key={section.title}>
                        <div className="flex items-center gap-2 mb-4">
                          <section.icon className="h-4 w-4 text-primary-400" />
                          <span className="text-sm font-semibold text-white">{section.title}</span>
                        </div>
                        <div className="space-y-2">
                          {section.items.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                            >
                              <span className="text-sm font-medium text-dark-200 group-hover/item:text-white transition-colors">
                                {item.label}
                              </span>
                              <p className="text-xs text-dark-500 mt-0.5">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </button>

              {isAuthenticated && (
                <>
                  {/* Notifications */}
                  <button className="relative p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full" />
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <ChevronDown className={`h-4 w-4 text-dark-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showUserMenu && (
                      <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl p-2 shadow-glass animate-slide-down">
                        <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                          <Sparkles className="h-4 w-4 text-primary-400" />
                          <span className="text-sm text-dark-200">Dashboard</span>
                        </Link>
                        <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                          <Settings className="h-4 w-4 text-dark-400" />
                          <span className="text-sm text-dark-200">Settings</span>
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button 
                          onClick={() => {
                            localStorage.removeItem('isAuthenticated');
                            window.location.href = '/';
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4 text-accent-rose" />
                          <span className="text-sm text-dark-200">Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* CTA Button - Only show login for non-authenticated users */}
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="hidden sm:flex items-center gap-2 btn-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  Create Post
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 glass text-dark-300 hover:text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-dark border-t border-white/5 animate-slide-down">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-dark-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/10" />
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="flex items-center justify-center gap-2 btn-primary text-white px-5 py-3 rounded-xl font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Create Post
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 glass text-dark-300 px-5 py-3 rounded-xl font-medium"
                >
                  <User className="h-4 w-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          <div 
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl glass rounded-2xl p-2 shadow-glass animate-scale-in">
            <div className="flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, or ask AI..."
                className="flex-1 bg-transparent py-4 text-white placeholder-dark-500 outline-none text-lg"
                autoFocus
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-dark-800 text-dark-400 text-xs font-mono">
                ESC
              </kbd>
            </div>
            
            {searchQuery && (
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                  <Sparkles className="h-4 w-4 text-primary-400" />
                  AI Suggestions
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <span className="text-white">How to write better blog posts with AI</span>
                    <span className="block text-xs text-dark-500 mt-1">Suggested article</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <span className="text-white">Generate content about "{searchQuery}"</span>
                    <span className="block text-xs text-dark-500 mt-1">Create with AI</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;

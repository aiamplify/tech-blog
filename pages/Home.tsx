import React from 'react';
import Hero from '../components/Hero';
import ArticleGrid from '../components/ArticleGrid';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Globe, ArrowRight, Star, Users, FileText, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Writing',
      description: 'Generate professional blog posts in seconds with advanced AI technology.',
      color: 'from-primary-500 to-accent-violet'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create, edit, and publish content faster than ever before.',
      color: 'from-accent-amber to-accent-rose'
    },
    {
      icon: Shield,
      title: 'SEO Optimized',
      description: 'Built-in SEO tools to help your content rank higher.',
      color: 'from-accent-emerald to-accent-cyan'
    },
    {
      icon: Globe,
      title: 'Publish Anywhere',
      description: 'One-click publishing to multiple platforms and formats.',
      color: 'from-accent-cyan to-primary-500'
    }
  ];

  const stats = [
    { icon: FileText, value: '10K+', label: 'Articles Created' },
    { icon: Users, value: '5K+', label: 'Active Users' },
    { icon: Star, value: '4.9', label: 'User Rating' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
  ];

  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Hero />
        </section>

        {/* Features Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-dark-300 mb-6">
                <Sparkles className="h-4 w-4 text-primary-400" />
                Powerful Features
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Everything You Need to <span className="text-gradient">Create</span>
              </h2>
              <p className="text-xl text-dark-400 max-w-2xl mx-auto">
                Our AI-powered platform gives you all the tools to create stunning content that engages and converts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group glass rounded-2xl p-8 card-hover relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-dark-400">{feature.description}</p>
                  
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleGrid />
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/20 mb-4">
                      <stat.icon className="h-6 w-6 text-primary-400" />
                    </div>
                    <div className="text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-dark-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-dark-950" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
              
              {/* Floating orbs */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/30 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

              {/* Content */}
              <div className="relative z-10 py-20 px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to Create Amazing Content?
                </h2>
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                  Join thousands of creators who are already using TechPulse to create stunning blog posts with AI.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    to="/admin"
                    className="group flex items-center gap-3 bg-white text-dark-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-dark-100 transition-colors"
                  >
                    <Sparkles className="h-5 w-5" />
                    Start Creating Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/about"
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white/90 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

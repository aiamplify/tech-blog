import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Twitter, Github, Linkedin, Youtube, Mail, 
  ArrowRight, Heart, Globe, Sparkles, ExternalLink 
} from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { label: 'Features', href: '/services' },
      { label: 'AI Writer', href: '/admin' },
      { label: 'Templates', href: '/resources' },
      { label: 'Pricing', href: '/services' },
      { label: 'Changelog', href: '/resources' },
    ],
    resources: [
      { label: 'Documentation', href: '/resources' },
      { label: 'API Reference', href: '/resources' },
      { label: 'Blog', href: '/' },
      { label: 'Community', href: '/contact' },
      { label: 'Support', href: '/contact' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/about' },
      { label: 'Press Kit', href: '/resources' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partners', href: '/about' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/about' },
      { label: 'Terms of Service', href: '/about' },
      { label: 'Cookie Policy', href: '/about' },
      { label: 'GDPR', href: '/about' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      {/* Newsletter Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="h-4 w-4 text-primary-400" />
              <span className="text-sm font-medium text-dark-300">Stay Updated</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Get the Latest in Tech & AI
            </h2>
            <p className="text-dark-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly insights, tutorials, and the latest AI content creation tips.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl input-glass text-white placeholder-dark-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSubscribed ? (
                  <>
                    <Heart className="h-5 w-5 text-accent-rose" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-dark-600 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="glass-dark py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center space-x-3 group mb-6">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-white">
                    TechPulse
                  </span>
                  <span className="text-[10px] font-medium text-dark-500 uppercase tracking-widest">
                    AI Content Studio
                  </span>
                </div>
              </Link>
              
              <p className="text-dark-400 text-sm mb-6 max-w-xs">
                The ultimate AI-powered platform for creating stunning blog content. Transform your ideas into professional articles in seconds.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2.5 rounded-xl glass hover:bg-white/10 text-dark-400 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-dark-500">
              <span>© {new Date().getFullYear()} TechPulse News.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <Globe className="h-4 w-4" />
                <span>English (US)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-dark-500">
                Made with <Heart className="h-4 w-4 text-accent-rose mx-1" /> by TechPulse Team
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default Footer;

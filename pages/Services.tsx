import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Shield, Globe, ArrowRight, Check, 
  PenTool, Image, Target, BarChart3, Users, Clock,
  FileText, Layers, Bot, Palette, Code, MessageSquare
} from 'lucide-react';

const Services: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const services = [
    {
      icon: PenTool,
      title: 'AI Blog Writer',
      description: 'Generate professional blog posts in seconds with our advanced AI technology.',
      features: ['SEO-optimized content', 'Multiple writing styles', 'Instant generation', 'Edit & refine tools'],
      color: 'from-primary-500 to-accent-violet'
    },
    {
      icon: Image,
      title: 'AI Image Generator',
      description: 'Create stunning visuals for your content with AI-powered image generation.',
      features: ['Custom illustrations', 'Stock photo alternatives', 'Brand-consistent imagery', 'Multiple styles'],
      color: 'from-accent-amber to-accent-rose'
    },
    {
      icon: Target,
      title: 'SEO Optimization',
      description: 'Built-in SEO tools to help your content rank higher in search results.',
      features: ['Keyword analysis', 'Meta tag optimization', 'Readability scoring', 'Competition analysis'],
      color: 'from-accent-emerald to-accent-cyan'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your content performance with detailed analytics and insights.',
      features: ['Real-time metrics', 'Engagement tracking', 'Growth insights', 'Export reports'],
      color: 'from-accent-cyan to-primary-500'
    },
    {
      icon: Layers,
      title: 'Template Library',
      description: 'Access hundreds of professionally designed templates for any content type.',
      features: ['Blog templates', 'Landing pages', 'Email newsletters', 'Social media posts'],
      color: 'from-accent-violet to-accent-rose'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get real-time suggestions and improvements as you write.',
      features: ['Grammar correction', 'Tone adjustment', 'Content expansion', 'Fact checking'],
      color: 'from-primary-400 to-accent-emerald'
    },
  ];

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual creators',
      price: billingCycle === 'monthly' ? 0 : 0,
      features: [
        '5 AI-generated articles/month',
        '10 AI images/month',
        'Basic SEO tools',
        'Community support',
        '1 user'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For serious content creators',
      price: billingCycle === 'monthly' ? 29 : 290,
      features: [
        'Unlimited AI articles',
        '100 AI images/month',
        'Advanced SEO suite',
        'Priority support',
        'Analytics dashboard',
        '3 team members'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For teams and agencies',
      price: billingCycle === 'monthly' ? 99 : 990,
      features: [
        'Everything in Pro',
        'Unlimited AI images',
        'Custom AI training',
        'Dedicated support',
        'API access',
        'Unlimited team members'
      ],
      cta: 'Contact Sales',
      popular: false
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-dark-300 mb-6">
              <Zap className="h-4 w-4 text-primary-400" />
              Our Services
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Powerful Tools for <span className="text-gradient">Content Creators</span>
            </h1>
            <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">
              Everything you need to create, optimize, and publish amazing content. Powered by cutting-edge AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group glass rounded-2xl p-8 card-hover relative overflow-hidden">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{service.title}</h3>
                <p className="text-dark-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm text-dark-300">
                      <Check className="h-4 w-4 text-accent-emerald flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto mb-8">
              Choose the plan that's right for you. All plans include a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 rounded-2xl glass">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-primary-500 text-white shadow-glow' 
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-primary-500 text-white shadow-glow' 
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-accent-emerald">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative glass rounded-2xl p-8 ${
                  plan.popular ? 'border-2 border-primary-500 shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-dark-400 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-display font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-dark-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-dark-300">
                      <Check className="h-5 w-5 text-accent-emerald flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/admin"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    plan.popular 
                      ? 'btn-primary text-white' 
                      : 'glass hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-dark-400">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { q: 'How does the AI content generation work?', a: 'Our AI uses advanced language models to generate high-quality content based on your topic and preferences. Simply enter a topic, and our AI will create a complete, SEO-optimized article in seconds.' },
                { q: 'Can I edit the AI-generated content?', a: 'Absolutely! All generated content is fully editable. You can refine, expand, or completely rewrite any part of the content using our built-in editor.' },
                { q: 'Is the content unique and plagiarism-free?', a: 'Yes, all AI-generated content is original and unique. Our AI creates content from scratch based on your inputs, ensuring no plagiarism issues.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans. All payments are processed securely.' },
              ].map((faq, idx) => (
                <div key={idx} className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-dark-400">{faq.a}</p>
                </div>
              ))}
            </div>
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
                Ready to Transform Your Content?
              </h2>
              <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
                Start creating amazing content today with our AI-powered tools.
              </p>
              <Link 
                to="/admin"
                className="inline-flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

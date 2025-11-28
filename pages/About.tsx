import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Users, Target, Award, ArrowRight, Sparkles, 
  Globe, Shield, Heart, Code, Lightbulb, Rocket
} from 'lucide-react';

const About: React.FC = () => {
  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', avatar: '👨‍💻' },
    { name: 'Sarah Johnson', role: 'Head of AI', avatar: '👩‍🔬' },
    { name: 'Mike Williams', role: 'Lead Developer', avatar: '👨‍💼' },
    { name: 'Emily Davis', role: 'Design Director', avatar: '👩‍🎨' },
  ];

  const values = [
    { icon: Lightbulb, title: 'Innovation', description: 'We push the boundaries of what\'s possible with AI and content creation.' },
    { icon: Heart, title: 'User-Centric', description: 'Every feature we build starts with understanding our users\' needs.' },
    { icon: Shield, title: 'Trust', description: 'We prioritize security, privacy, and transparency in everything we do.' },
    { icon: Rocket, title: 'Excellence', description: 'We strive for excellence in every line of code and every pixel.' },
  ];

  const milestones = [
    { year: '2022', title: 'Founded', description: 'TechPulse was born from a vision to democratize content creation.' },
    { year: '2023', title: 'AI Integration', description: 'Launched our first AI-powered writing assistant.' },
    { year: '2024', title: '10K Users', description: 'Reached 10,000 active content creators on our platform.' },
    { year: '2025', title: 'Global Expansion', description: 'Expanded to serve creators in over 50 countries.' },
  ];

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
              <Sparkles className="h-4 w-4 text-primary-400" />
              About TechPulse
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Empowering Creators with <span className="text-gradient">AI Technology</span>
            </h1>
            <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">
              We're on a mission to make professional content creation accessible to everyone through the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/admin"
                className="group flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold"
              >
                <Sparkles className="h-5 w-5" />
                Start Creating
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-dark-300 hover:text-white glass hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-dark-400 mb-6 leading-relaxed">
                At TechPulse, we believe that everyone has a story worth telling. Our mission is to remove the barriers between ideas and published content by leveraging cutting-edge AI technology.
              </p>
              <p className="text-lg text-dark-400 mb-8 leading-relaxed">
                We're building tools that empower creators, marketers, and businesses to produce high-quality content faster than ever before, without sacrificing creativity or authenticity.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl font-display font-bold text-gradient mb-2">10K+</div>
                  <div className="text-dark-400">Active Creators</div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl font-display font-bold text-gradient mb-2">50M+</div>
                  <div className="text-dark-400">Words Generated</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-dark-400 leading-relaxed">
                    To become the world's leading AI-powered content creation platform, enabling millions of creators to share their ideas with the world effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="glass rounded-2xl p-8 card-hover text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{value.title}</h3>
                <p className="text-dark-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              From a simple idea to a platform serving thousands of creators
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-cyan to-accent-emerald" />
              
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative pl-24 pb-12 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary-500 border-4 border-dark-950 shadow-glow" />
                  
                  <div className="glass rounded-2xl p-6">
                    <span className="text-sm font-bold text-primary-400">{milestone.year}</span>
                    <h3 className="text-xl font-display font-bold text-white mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-dark-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              The passionate people behind TechPulse
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-dark-400">{member.role}</p>
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
                Ready to Join Us?
              </h2>
              <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
                Start creating amazing content today and join thousands of creators who trust TechPulse.
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

export default About;

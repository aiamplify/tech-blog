import React, { useState } from 'react';
import { 
  Mail, MapPin, Phone, Send, MessageSquare, Clock, 
  CheckCircle, ArrowRight, Sparkles, Globe, Users, Zap
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@techpulse.news', 'support@techpulse.news'],
      color: 'from-primary-500 to-accent-violet'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Innovation Drive', 'San Francisco, CA 94105'],
      color: 'from-accent-emerald to-accent-cyan'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm PST'],
      color: 'from-accent-amber to-accent-rose'
    },
  ];

  const faqs = [
    { q: 'How quickly do you respond?', a: 'We typically respond within 24 hours during business days.' },
    { q: 'Do you offer phone support?', a: 'Yes, phone support is available for Pro and Enterprise plans.' },
    { q: 'Can I schedule a demo?', a: 'Absolutely! Use the form to request a personalized demo.' },
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
              <MessageSquare className="h-4 w-4 text-primary-400" />
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? Our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 text-center card-hover">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3">{info.title}</h3>
                {info.details.map((detail, didx) => (
                  <p key={didx} className="text-dark-400 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Send a Message</h2>
              <p className="text-dark-400 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="glass rounded-2xl p-8 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-2xl bg-accent-emerald/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-accent-emerald" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-dark-400">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full input-glass rounded-xl px-4 py-3.5 text-white placeholder-dark-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full input-glass rounded-xl px-4 py-3.5 text-white placeholder-dark-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full input-glass rounded-xl px-4 py-3.5 text-white"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full input-glass rounded-xl px-4 py-3.5 text-white placeholder-dark-500 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ & Additional Info */}
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Quick Answers</h2>
              <p className="text-dark-400 mb-8">
                Find answers to common questions below.
              </p>

              <div className="space-y-4 mb-12">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="glass rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-dark-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className="glass rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent-emerald" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Average Response Time</h3>
                    <p className="text-dark-400 text-sm">Under 24 hours</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-accent-emerald to-accent-cyan rounded-full" />
                </div>
              </div>

              {/* Support Hours */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Support Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Sunday</span>
                    <span className="text-dark-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl overflow-hidden h-80 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-16 w-16 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-500">Interactive map coming soon</p>
              </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using TechPulse to create amazing content.
              </p>
              <a 
                href="/admin"
                className="inline-flex items-center gap-3 btn-primary text-white px-8 py-4 rounded-2xl font-semibold"
              >
                <Sparkles className="h-5 w-5" />
                Start Creating Free
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent! (This is a demo)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-glow">
                        Get in Touch
                    </h1>
                    <p className="text-gray-400 text-lg mb-12">
                        Have a question, a tip, or just want to say hello? We'd love to hear from you. Fill out the form or reach us directly.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-surface-dark p-3 rounded-lg border border-gray-700">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Email Us</h3>
                                <p className="text-gray-400">contact@techpulsenews.com</p>
                                <p className="text-gray-400">press@techpulsenews.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-surface-dark p-3 rounded-lg border border-gray-700">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Visit Us</h3>
                                <p className="text-gray-400">123 Innovation Drive</p>
                                <p className="text-gray-400">Tech Valley, CA 94025</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-surface-dark p-3 rounded-lg border border-gray-700">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Call Us</h3>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                                <p className="text-gray-500 text-sm">Mon-Fri, 9am - 6pm PST</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-surface-dark border border-gray-700 p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-background-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-background-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-background-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                placeholder="How can we help?"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-white hover:text-background-dark text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <Send className="h-5 w-5" /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;

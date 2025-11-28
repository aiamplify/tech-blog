import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, Sparkles, Zap, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));

        const envUser = import.meta.env.VITE_ADMIN_USER;
        const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

        const validUser = envUser || 'admin';
        const validPass = envPass || 'password123';

        if (username === validUser && password === validPass) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials. Please try again.');
        }
        setIsLoading(false);
    };

    const features = [
        { icon: Sparkles, text: 'AI-Powered Content Generation' },
        { icon: Zap, text: 'Lightning Fast Publishing' },
        { icon: Shield, text: 'Secure & Private' },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-dark-950" />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />

                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/30 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16">
                    <Link to="/" className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Zap className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-display font-bold text-white">TechPulse</span>
                            <span className="block text-xs text-white/60 uppercase tracking-widest">AI Content Studio</span>
                        </div>
                    </Link>

                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                        Create Amazing Content with AI
                    </h1>
                    <p className="text-lg text-white/70 mb-12 max-w-md">
                        Transform your ideas into professional blog posts in seconds. Powered by advanced AI, designed for creators.
                    </p>

                    <div className="space-y-4">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <feature.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-white/90 font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10">
                        <p className="text-sm text-white/50">
                            Trusted by thousands of content creators worldwide
                        </p>
                        <div className="flex items-center gap-6 mt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-cyan border-2 border-primary-700" />
                                ))}
                            </div>
                            <span className="text-white/70 text-sm">+10,000 creators</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-dark-950">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link to="/" className="lg:hidden flex items-center gap-3 mb-12 justify-center">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-primary-400" />
                        </div>
                        <span className="text-xl font-display font-bold text-white">TechPulse</span>
                    </Link>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 mb-6">
                            <Lock className="h-8 w-8 text-primary-400" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-dark-400">Sign in to access your content studio</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full input-glass rounded-xl py-4 pl-12 pr-4 text-white placeholder-dark-500"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full input-glass rounded-xl py-4 pl-12 pr-12 text-white placeholder-dark-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose animate-slide-down">
                                <Shield className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-dark-500 text-sm">
                            Don't have an account?{' '}
                            <button className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                                Contact Admin
                            </button>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-4 rounded-xl glass">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="h-4 w-4 text-accent-emerald" />
                            <span className="text-xs font-medium text-dark-300">Demo Credentials</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-dark-500">Username:</span>
                                <code className="ml-2 text-primary-400">admin</code>
                            </div>
                            <div>
                                <span className="text-dark-500">Password:</span>
                                <code className="ml-2 text-primary-400">password123</code>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-dark-600">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

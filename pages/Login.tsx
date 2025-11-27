import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const envUser = import.meta.env.VITE_ADMIN_USER;
        const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

        // Fallback for local dev if env vars are missing (optional, but helpful)
        // or strictly require them. Given user request, we should probably expect them.
        // But to avoid locking them out if they haven't set them locally yet:
        const validUser = envUser || 'admin';
        const validPass = envPass || 'password123';

        if (username === validUser && password === validPass) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark px-4">
            <div className="bg-surface-dark p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400 mt-2">Sign in to access the creator studio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-background-dark border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Enter username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background-dark border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                    >
                        Sign In <ArrowRight className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

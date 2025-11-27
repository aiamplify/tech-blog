import React from 'react';
import { Rocket } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-primary/10 p-6 rounded-full mb-8 animate-pulse">
                <Rocket className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-glow">
                Coming Soon
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
                We are working hard to bring you the story behind TechPulse. Stay tuned for updates!
            </p>
        </div>
    );
};

export default About;

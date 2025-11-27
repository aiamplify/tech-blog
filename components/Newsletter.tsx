import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-surface-dark/50 py-20 mt-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-glow tracking-wide">
          STAY INFORMED. SUBSCRIBE TO OUR NEWSLETTER.
        </h2>
        <p className="text-gray-400 mb-8 text-lg">Sign up for our newsletter to subscribe and evolve.</p>
        
        <form className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="flex-1 bg-background-dark border border-gray-600 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all shadow-inner"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-1 bg-background-dark border border-gray-600 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all shadow-inner"
          />
          <button 
            type="submit" 
            className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5"
          >
            SIGN UP
          </button>
        </form>
        
        <div className="flex items-center justify-center">
          <input 
            id="consent" 
            name="consent" 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-600 text-primary focus:ring-primary bg-background-dark cursor-pointer"
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-400 cursor-pointer select-none">
            I agree to the <a href="#" className="font-medium text-primary hover:underline hover:text-glow">Privacy Policy</a>.
          </label>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

import React from 'react';
import { Facebook, Twitter, Globe, Youtube, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-sm">
              {['About', 'News', 'Reviews', 'Features', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm">
              {['Blog', 'Resources', 'Privacy Policy', 'Read Content', 'Contact Hunrher'].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              {['Contact Us', 'Privacy Policy', 'Legal', 'Connect Connect'].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-display font-bold text-white mb-4 text-lg">Connect</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Globe className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <BookOpen className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2022 TechPulse News, Inc.</p>
          <p>Copyright – All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

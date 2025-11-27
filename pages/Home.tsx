import React from 'react';
import Hero from '../components/Hero';
import ArticleGrid from '../components/ArticleGrid';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <Hero />
        <ArticleGrid />
      </main>
      <Newsletter />
    </>
  );
};

export default Home;

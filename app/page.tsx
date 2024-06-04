import React from 'react';
import Hero from '@/components/Hero';
import TrandingGames from '@/components/TrandingGames';
import FeaturedSection from '@/components/FeaturedSection';
import CategorySection from '@/components/CategorySection';
import NewsLetter from '@/components/NewsLetter';
import ReacentGamesSection from '@/components/RecentGamesSection';

const Home = () => {
  return (
    <>
      <Hero />
      <TrandingGames />
      <FeaturedSection />
      <CategorySection />
      <ReacentGamesSection />
      <NewsLetter />
    </>
  );
};

export default Home;

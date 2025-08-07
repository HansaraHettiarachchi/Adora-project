import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import TopSellingFlowers from '../components/Home/TopSellingFlowers';
import GiftOfferSection from '../components/Home/GiftOfferSection';
import PopularCategories from '../components/Home/PopularCategories';
import HowItWorksSection from '../components/Home/HowItWorksSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <div className="container my-5">
        <TopSellingFlowers />
        <GiftOfferSection />
        <PopularCategories />
        <HowItWorksSection />
      </div>
    </>
  );
};

export default Home;
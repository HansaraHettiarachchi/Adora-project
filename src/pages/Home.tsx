import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import TopSellingFlowers from '../components/Home/TopSellingFlowers';
import GiftOfferSection from '../components/Home/GiftOfferSection';
import PopularCategories from '../components/Home/PopularCategories';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TopSellingFlowers />
      <GiftOfferSection />
      <PopularCategories />
      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default Home;
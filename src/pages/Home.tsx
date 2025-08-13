import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TopSellingFlowers from '../components/home/TopSellingFlowers';
import GiftOfferSection from '../components/home/GiftOfferSection';
import PopularCategories from '../components/home/PopularCategories';
import HowItWorksSection from '../components/home/HowItWorksSection';
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
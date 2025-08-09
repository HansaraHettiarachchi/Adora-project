import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TopSellingFlowers from '../components/home/TopSellingFlowers';
import GiftOfferSection from '../components/home/GiftOfferSection';
import PopularCategories from '../components/home/PopularCategories';
import HowItWorksSection from '../components/home/HowItWorksSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TopSellingFlowers />
          <GiftOfferSection />
      <Container className='d-flex justify-content-center'>
        <Container >
          <PopularCategories />
          <HowItWorksSection />
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
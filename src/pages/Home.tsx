import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import TopSellingFlowers from '../components/Home/TopSellingFlowers';
import GiftOfferSection from '../components/Home/GiftOfferSection';
import PopularCategories from '../components/Home/PopularCategories';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TopSellingFlowers />
      <Container className='d-flex justify-content-center'>
        <Container >
          <GiftOfferSection />
          <PopularCategories />
          <HowItWorksSection />
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
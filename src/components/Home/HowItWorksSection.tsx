import React from 'react';
import sampleVideo from '../../assets/videos/sample.mp4'; // your video path
import './css/HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  return (
    <div className="container my-5 how-it-works-wrapper">
      <div className="video-container">
        <video
          src={sampleVideo}
          autoPlay
          muted
          loop
          playsInline
          className="how-it-works-video"
        />
        <div className="text-box text-center">
          <h2>How it Works?</h2>
          <p>
            A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Magnoliophyta, also called angiosperms).
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
import React from 'react'
import Introduction from './Introduction/Introduction';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import AdditionalServices from './AdditionalServices/AdditionalServices';
import CallToAction from './CallToAction/CallToAction';
import MainBannerr from './LastBanner/MainBannerr';
import MainBanner from "./MainBanner/MainBanner"
import Experience from "./Experience/Experience"
import Footer from "../../components/Footer/Footer"
import "./style.css"
const AboutusPeg = () => {
  return (
    <div>
      <div className="App">
        <MainBanner />
        <Introduction />
        <Experience />
        <div className="app-container">
          <WhyChooseUs />
          <AdditionalServices />
        </div>
        <CallToAction />
        <MainBannerr />
      </div>
      <Footer />
    </div>
  );
}

export default AboutusPeg

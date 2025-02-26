import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { CiPhone } from "react-icons/ci";
import backgroundImage from "../../assets/images/10001.jpg";
import Appointment from "../components/Appointment/Appointment";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  return (
    <>
      <section
        className='page-title'
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='auto-container'>
          <h2>Contact</h2>
          <ul className='page-breadcrumb'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>Contact</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='row clearfix'>
            {/* Map Column */}
            <div className='map-column col-lg-7'>
              <div className='inner-column'>
                <div className='contact-map' style={{ height: "470px" }}>
                <iframe
                  className="contact"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d985.1870227756814!2d38.68547600000001!3d8.995312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNTknNDMuMSJOIDM4wrA0MScwNy43IkU!5e0!3m2!1sen!2set!4v1740414577762!5m2!1sen!2set"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
              </div>
            </div>
            {/* Info Column */}
            <div className='info-column col-lg-5'>
              <div className='inner-column'>
                <h4>Our Address</h4>
                <div className='text'>
                  Completely synergize resource taxing relationships via premier
                  niche markets. Professionally cultivate one-to-one customer
                  service.
                </div>
                <div className="col-md-12">
                  <ul className="">
                    <div className="Address">
                      <LuMapPin className="mr-3" size={30} />
                      <h3>Address:</h3>
                    </div>
                    (Addis Ababa, Ethiopia)
                    <li>
                      <span className="email">
                        <div className="Email">
                          <MdOutlineMailOutline className="mr-3" size={30} />
                          <h3>Email:</h3>
                        </div>
                      </span>
                      (info@abegarage.com)
                    </li>
                    <li>
                      <span className="bi bi-envelope">
                        <div className="phone">
                          <CiPhone className="mr-3" size={35} />
                          <h3>Phone:</h3>
                        </div>
                      </span>
                      +251 912 34 56 78
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>
        
      </section>
      {/* End Contact Section */}
      <Appointment />
      <Footer />
    </>
  );
};

export default Contact;

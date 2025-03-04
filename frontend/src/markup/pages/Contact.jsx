import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { CiPhone } from "react-icons/ci";
import backgroundImage from "../../assets/images/10001.jpg";
import Appointment from "../components/Appointment/Appointment";
import Footer from "../components/Footer/Footer";
import styles from "./Contact.module.css";

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
                <div className={`${styles.contactInfo}`}>
                <h2>Our Address <span>____</span></h2>
                <div className={styles.description}>
                    Completely synergize resource taxing relationships via premier niche
                    markets. Professionally cultivate one-to-one customer service.
                </div>
                <address className={styles.address}>
                    <div>
                        <i className="fas fa-map-marker-alt"></i>
                        <p><strong>Address:</strong> <br />Addis Ababa, Ethiopia</p>
                    </div>
                    <div>
                        <i className="fas fa-envelope"></i>
                        <p><strong>Email:</strong> <br /> info@abegarage.com</p>
                    </div>
                    <div>
                        <i className="fas fa-phone"></i>
                        <p><strong>Phone:</strong> <br /> +251912345678</p>
                    </div>
                </address>
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

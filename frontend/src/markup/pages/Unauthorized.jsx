import React from 'react';
import Footer from '../components/Footer/Footer';

function Unauthorized() {
  return (
    <div>
      <h1>You don't have the authorization to access the page you requested</h1>
      <Footer />
    </div>
  );
}

export default Unauthorized; 
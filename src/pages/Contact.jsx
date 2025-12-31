import React from 'react'
import ProductPage from '../components/ProductPage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeaturedItems from '../components/FeaturedItems'
import Whatsapp from '../components/whatsapp'
import ContactSection from '../components/ContactSection'
import { Link } from 'react-router-dom'


const Contact = () => {
  return (
    <div>
      <Header/>
      <div className="abt-nav-img">
        <div className="about-nav-section">
          <h1>
            <strong> Contact</strong>
          </h1>
          <p>
            <Link to="/"> Home </Link>/ Contact
          </p>
        </div>
      </div>
     <ContactSection/>
      {/* <FeaturedItems/> */}
      <Footer/>
      <Whatsapp/>
    </div>
  )
}

export default Contact

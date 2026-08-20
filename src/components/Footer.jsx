import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" className="logo">
            <img src="/Cit logo.png" alt="CIT Logo" className="logo-img" />
            <span className="logo-text">ISMLIA <span className="accent-text">'26</span></span>
          </Link>
          <p>
            One Day International Symposium on Machine Learning and its Industrial Applications (ISMLIA)
            <br />
            Friday 25th September 2026
          </p>
          <p>
            Organized by Department of CSE (AIML) & Dept of IT
            <br />
            <strong>Chennai Institute of Technology, Chennai, India</strong>
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore Pages</h4>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/about">About Page</Link></li>
            <li><Link to="/team">Team Page</Link></li>
            <li><Link to="/poster">Poster Competition</Link></li>
            <li><Link to="/contact">Contact Page</Link></li>
            <li><Link to="/register">Register Page</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Organizing Secretariat</h4>
          <p><strong>Chennai Institute of Technology</strong></p>
          <p>Sarathy Nagar, Kundrathur, Chennai - 600069</p>
          <p>Email: ismlia2026@citchennai.net</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            © 2026 International Symposium on Machine Learning and its Industrial Applications (ISMLIA) • Chennai
            Institute of Technology
          </p>
        </div>
      </div>
    </footer>
  )
}

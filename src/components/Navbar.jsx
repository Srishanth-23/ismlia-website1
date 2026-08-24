import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // On non-home pages, the navbar is always "scrolled" (solid) as in the original HTML.
    if (location.pathname !== '/') {
      setScrolled(true)
    } else {
      handleScroll() // Initialize for home page
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="/Cit logo.png" alt="CIT Logo" className="logo-img" />
          <span className="logo-text">ISMLIA <span className="accent-text">'26</span></span>
        </Link>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/team" 
            className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Team
          </Link>
          <Link 
            to="/poster" 
            className={`nav-link ${location.pathname === '/poster' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Poster
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Register
          </Link>
        </nav>

        <div className="nav-actions">
          <Link to="/register" className="btn btn-primary nav-btn" onClick={closeMobileMenu}>
            Register Now
          </Link>
          <button 
            className="mobile-toggle" 
            id="mobile-toggle" 
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

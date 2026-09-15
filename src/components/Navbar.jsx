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

    if (location.pathname !== '/') {
      setScrolled(true)
    } else {
      handleScroll()
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`} id="navbar">
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
            
            {/* Mobile-only CTA in drawer */}
            <div className="mobile-nav-cta">
              <Link to="/register" className="btn btn-primary btn-full" onClick={closeMobileMenu}>
                Register for ISMLIA '26
              </Link>
            </div>
          </nav>

          <div className="nav-actions">
            <Link to="/register" className="btn btn-primary nav-btn" onClick={closeMobileMenu}>
              Register Now
            </Link>
            <button 
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
              id="mobile-toggle" 
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Backdrop overlay for mobile menu */}
      <div 
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
    </>
  )
}

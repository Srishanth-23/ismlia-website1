import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function Register() {
  const location = useLocation()
  const registerSectionRef = useRef(null)

  useEffect(() => {
    if (location.state?.scrollTarget === 'register' || location.hash === '#register') {
      registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  const handleRegisterRedirect = () => {
    // Official Google Form Registration Portal Link
    window.open('https://forms.gle/ismlia2026-placeholder', '_blank', 'noopener,noreferrer')
  }

  const handleDriveRedirect = () => {
    // Official Google Drive Abstract Folder link
    window.open('https://drive.google.com/drive/folders/1b-T9_6l7E-vE_X-ismlia26-posters-placeholder', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="register-page">
      {/* Page Header Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="section-tag">Online Registration Portal</span>
          <h1 className="page-title">Symposium Registration</h1>
          <p className="page-subtitle">Select your delegate pass category and proceed to the official registration portal</p>
        </div>
      </section>

      {/* Ticket Pricing Grid */}
      <section className="section pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Registration Fee Categories</span>
            <h2 className="section-title">Select Your Pass</h2>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Academic Institutions (Students)</h3>
                <p className="pricing-subtitle">For Undergrad, Postgrad & PhD Scholars</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">250</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Access to all 5 Keynote Lectures</li>
                <li>Participation in Poster Competition</li>
                <li>Conference Kit & Lunch Included</li>
                <li>Official CIT Participation Certificate</li>
              </ul>
              <button 
                className="btn btn-outline btn-full select-pass-btn" 
                onClick={handleRegisterRedirect}
              >
                Register as Student
              </button>
            </div>

            <div className="pricing-card featured">
              <div className="popular-badge">Faculty</div>
              <div className="pricing-header">
                <h3>Academic Institutions (Faculty)</h3>
                <p className="pricing-subtitle">For Professors, Lecturers & Academic Researchers</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">500</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Full Symposium & Panel Discussion Access</li>
                <li>Networking session with International Keynotes</li>
                <li>Conference Kit, High Tea & Lunch</li>
                <li>Official CIT Faculty Delegate Certificate</li>
              </ul>
              <button 
                className="btn btn-primary btn-full select-pass-btn" 
                onClick={handleRegisterRedirect}
              >
                Register as Faculty
              </button>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Industry, R&D Laboratories</h3>
                <p className="pricing-subtitle">For Corporate R&D, Engineers & Industry Delegates</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">2,000</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Full Access to Industrial Application Talks</li>
                <li>1-on-1 Interaction with Industry Leaders</li>
                <li>Executive Delegate Kit, High Tea & Lunch</li>
                <li>Certificate & Industry Partnership Access</li>
              </ul>
              <button 
                className="btn btn-outline btn-full select-pass-btn" 
                onClick={handleRegisterRedirect}
              >
                Register as Industry Delegate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Portal Action Card */}
      <section className="section register-section">
        <div className="container">
          <div className="register-card-wrapper" id="register" ref={registerSectionRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            
            {/* Left Info Column */}
            <div className="register-info-col" style={{ background: 'rgba(212, 175, 55, 0.03)', padding: '40px' }}>
              <span className="section-tag" style={{ color: 'var(--primary)' }}>Secure Access Portal</span>
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginTop: '10px' }}>Registration Portal</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                All participants, delegates, and poster presenters must submit registration details, payment receipts, and abstract files through our centralized Google Forms submission database.
              </p>
              
              <div className="register-perks" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Official CIT Secretariat Ingestion</span>
                </div>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Secure payment verification receipt upload</span>
                </div>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Poster abstract PDF storage synchronization</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="register-form-col" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
              <div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px' }}>Proceed to Google Form</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Click the button below to open the registration form in a new tab. Make sure to have your payment transaction receipt ready for upload.
                </p>
              </div>

              <button 
                onClick={handleRegisterRedirect} 
                className="btn btn-primary btn-full btn-lg" 
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px' }}
              >
                <span>Open Google Registration Form</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>

              {/* Shared Google Drive submission link info */}
              <div style={{ marginTop: '10px', padding: '20px', border: '1px dashed rgba(0, 240, 255, 0.25)', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.02)' }}>
                <h4 style={{ color: '#00f0ff', fontSize: '1rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📁</span> Abstract Submission Directory
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                  Registered poster session participants can view the shared Google Drive repository. Submitted abstracts are structured into individual participant folders automatically.
                </p>
                <button 
                  onClick={handleDriveRedirect} 
                  className="btn btn-outline btn-full btn-sm"
                  style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '10px' }}
                >
                  <span>Open Google Drive Repository</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import PosterGuidelines from '../components/PosterGuidelines'

export default function Poster() {
  return (
    <div className="poster-page">
      {/* Page Header Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="section-tag">Competition & Rules</span>
          <h1 className="page-title">Poster Presentation</h1>
          <p className="page-subtitle">Showcase your Machine Learning research, project work, or industry case studies at ISMLIA 2026</p>
        </div>
      </section>

      {/* Main Poster Section */}
      <section className="section poster-section" id="poster">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Poster Call</span>
            <h2 className="section-title">Poster Presentation Competition</h2>
            <p className="section-desc">Students and research scholars can submit abstract writeups for the poster competition. The competition aims to present original work or well-researched case studies of ML applications.</p>
          </div>

          <div className="poster-card-wrapper" style={{ marginBottom: '50px' }}>
            <div className="poster-perk">
              <span className="prize-badge">1st Prize</span>
              <h3>Rs. 5,000</h3>
              <p>Best Poster Award + Certificate</p>
            </div>
            <div className="poster-perk">
              <span className="prize-badge">2nd Prize</span>
              <h3>Rs. 3,000</h3>
              <p>Second Best + Certificate</p>
            </div>
            <div className="poster-perk">
              <span className="prize-badge">3rd Prize</span>
              <h3>Rs. 2,000</h3>
              <p>Third Best + Certificate</p>
            </div>
          </div>

          <PosterGuidelines />

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link 
              to="/register#register" 
              state={{ scrollTarget: 'register', poster: 'Yes' }}
              className="btn btn-primary btn-lg" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <span>Register & Submit Abstract</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

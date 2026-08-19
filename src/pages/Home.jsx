import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import { speakersData } from '../data/speakers'

// Set the target date once when the module loads, exactly as in the original app.js
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 68)

export default function Home({ onSelectSpeaker }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00'
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(minutes).padStart(2, '0'),
        secs: String(seconds).padStart(2, '0')
      })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="home-page">
      {/* Home Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-container">
          {/* Official Symposium Title Card Graphic */}
          <div className="symposium-title-banner">
            <img src="/ChatGPT Image Aug 16, 2026, 08_14_57 PM.png" alt="ISMLIA'26 Title Card" className="title-card-img" />
          </div>

          <p className="organizer-tagline">
            <span className="dept-title">Organized by Department of Computer Science and Engineering (AIML) & Department of Information Technology</span> <br />
            <strong>CHENNAI INSTITUTE OF TECHNOLOGY – Chennai, India</strong>
          </p>

          <div className="hero-cta-group">
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>Register for Symposium</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/register" state={{ scrollTarget: 'poster' }} className="btn btn-glass btn-lg">
              <span>Submit Poster Abstract</span>
            </Link>
          </div>

          {/* Event Countdown */}
          <div className="countdown-card">
            <div className="countdown-header">Symposium Starts In</div>
            <div className="countdown-grid">
              <div className="time-box">
                <span className="time-num" id="cd-days">{timeLeft.days}</span>
                <span className="time-label">Days</span>
              </div>
              <div className="time-colon">:</div>
              <div className="time-box">
                <span className="time-num" id="cd-hours">{timeLeft.hours}</span>
                <span className="time-label">Hours</span>
              </div>
              <div className="time-colon">:</div>
              <div className="time-box">
                <span className="time-num" id="cd-mins">{timeLeft.mins}</span>
                <span className="time-label">Mins</span>
              </div>
              <div className="time-colon">:</div>
              <div className="time-box">
                <span className="time-num" id="cd-secs">{timeLeft.secs}</span>
                <span className="time-label">Secs</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">5</span>
              <span className="stat-desc">Keynote Lectures</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">1</span>
              <span className="stat-desc">Industrial Panel Debate</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">₹18,000</span>
              <span className="stat-desc">Poster Presentation Prizes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">CIT</span>
              <span className="stat-desc">Chennai, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights Section */}
      <section className="section about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Key Thrust Areas</span>
            <h2 className="section-title">Machine Learning in Industry 4.0</h2>
            <p className="section-desc">Pioneering applications in process modelling, digital twins, symbolic regression, and autonomous AI systems.</p>
          </div>

          {/* Horizontal Continuous Moving Ticker Marquee Bar */}
          <div className="ticker-marquee-wrapper">
            <div className="ticker-marquee-track">
              <FeatureCard 
                trackTag="THRUST AREA 01" 
                title="Digital Twin" 
                description="Combining first-principles physics models with data-driven ML algorithms for grey-box digital twins and real-time operational excellence."
              />
              <FeatureCard 
                trackTag="THRUST AREA 02" 
                title="Symbolic Regression" 
                description="Discovering explicit mathematical expressions directly from sensor measurements to model nonlinear industrial dynamics."
              />
              <FeatureCard 
                trackTag="THRUST AREA 03" 
                title="Physics-Inspired Neural Networks" 
                description="Incorporating physics knowledge and mechanistic constraints directly into AI knowledge representation systems."
              />
              <FeatureCard 
                trackTag="THRUST AREA 04" 
                title="Agentic AI" 
                description="Autonomous multi-agent architectures for real-time value-driven implementation, process diagnosis, and control."
              />

              {/* Duplicate for infinite seamless horizontal loop */}
              <FeatureCard 
                trackTag="THRUST AREA 01" 
                title="Digital Twin" 
                description="Combining first-principles physics models with data-driven ML algorithms for grey-box digital twins and real-time operational excellence."
              />
              <FeatureCard 
                trackTag="THRUST AREA 02" 
                title="Symbolic Regression" 
                description="Discovering explicit mathematical expressions directly from sensor measurements to model nonlinear industrial dynamics."
              />
              <FeatureCard 
                trackTag="THRUST AREA 03" 
                title="Physics-Inspired Neural Networks" 
                description="Incorporating physics knowledge and mechanistic constraints directly into AI knowledge representation systems."
              />
              <FeatureCard 
                trackTag="THRUST AREA 04" 
                title="Agentic AI" 
                description="Autonomous multi-agent architectures for real-time value-driven implementation, process diagnosis, and control."
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/about" className="btn btn-outline">Explore Full About & Schedule →</Link>
          </div>
        </div>
      </section>

      {/* Keynote Speakers Section (Home Page Speakers Tab) */}
      <section className="section speakers-home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Keynote Speakers</span>
            <h2 className="section-title">International & Industrial Keynote Lecturers</h2>
            <p className="section-desc">World-renowned experts presenting practical AI & Machine Learning applications for industry.</p>
          </div>

          <div className="speakers-home-grid">
            {Object.values(speakersData).map((sp) => (
              <div 
                key={sp.id} 
                className="speaker-home-card" 
                onClick={() => onSelectSpeaker(sp.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="speaker-badge-num">{sp.badge}</div>
                <div className="speaker-avatar-circle">
                  <img src={sp.image} alt={sp.name} />
                </div>
                <h3>{sp.name}</h3>
                <span className="speaker-org">{sp.org}</span>
                <p className="speaker-topic">{sp.topic}</p>
                <span 
                  className="speaker-link view-profile-btn" 
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectSpeaker(sp.id)
                  }}
                >
                  View Full Profile →
                </span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/team" className="btn btn-primary">Meet Full Committee & Speakers →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

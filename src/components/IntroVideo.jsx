import React, { useState } from 'react'

export default function IntroVideo({ onClose }) {
  const [fading, setFading] = useState(false)

  const handleClose = () => {
    setFading(true)
    // Matches the 0.8s transition speed in styles.css (.video-intro-overlay transition: opacity 0.8s)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  return (
    <div className={`video-intro-overlay ${fading ? 'fade-out' : ''}`} id="video-intro-overlay">
      <video 
        id="intro-video-player" 
        playsInline 
        muted 
        autoPlay
        onEnded={handleClose}
      >
        <source src="/Title card (online-video-cutter.com).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="intro-controls">
        <button 
          className="btn btn-glass skip-intro-btn" 
          id="skip-intro-btn"
          onClick={handleClose}
        >
          <span>Enter Website</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

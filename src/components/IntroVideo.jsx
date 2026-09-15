import React, { useState, useEffect, useRef } from 'react'

export default function IntroVideo({ onClose }) {
  const [fading, setFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const handleClose = () => {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      onClose()
    }, 600)
  }

  // Lock body scroll while intro is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // Mobile autoplay attempt with fallback
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy; user can tap Enter button
        })
      }
    }
  }, [])

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(pct)
    }
  }

  return (
    <div 
      className={`video-intro-overlay ${fading ? 'fade-out' : ''}`} 
      id="video-intro-overlay"
    >
      {/* Ambient background blur for mobile letterboxing */}
      <div className="intro-ambient-bg" />

      {/* Main Video Wrapper */}
      <div className="intro-video-wrapper">
        <video 
          ref={videoRef}
          id="intro-video-player" 
          playsInline 
          webkit-playsinline="true"
          muted 
          autoPlay
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleClose}
          onError={handleClose}
        >
          <source src="/Title card (online-video-cutter.com).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Progress Bar at Top */}
      <div className="intro-progress-bar-container">
        <div className="intro-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Skip Controls */}
      <div className="intro-controls">
        <button 
          className="btn btn-glass skip-intro-btn" 
          id="skip-intro-btn"
          onClick={handleClose}
          aria-label="Skip intro and enter website"
        >
          <span>Enter Website</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

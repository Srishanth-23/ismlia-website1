import React, { useEffect } from 'react'
import { speakersData } from '../data/speakers'

export default function SpeakerModal({ speakerId, onClose }) {
  const speaker = speakerId ? speakersData[speakerId] : null

  useEffect(() => {
    if (speaker) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [speaker, onClose])

  if (!speaker) return null

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('speaker-modal-overlay')) {
      onClose()
    }
  }

  return (
    <div 
      className="modal-overlay speaker-modal-overlay active" 
      id="speaker-modal" 
      onClick={handleOverlayClick}
      role="dialog"
    >
      <div className="speaker-modal-box">
        <button className="speaker-modal-close" id="close-speaker-modal" onClick={onClose} aria-label="Close Profile Modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="speaker-modal-header">
          <span className="lecture-badge" id="sp-modal-badge">{speaker.badge}</span>
          <div className="speaker-modal-avatar-circle" id="sp-modal-avatar">
            {speaker.image ? (
              <img src={speaker.image} alt={speaker.name} />
            ) : (
              speaker.avatar
            )}
          </div>
          <h2 id="sp-modal-name">{speaker.name}</h2>
          <p className="speaker-modal-designation" id="sp-modal-designation">{speaker.designation}</p>
        </div>
        <div className="speaker-modal-content">
          <div className="talk-title-box">
            <h4>Talk Title: <span id="sp-modal-topic">{speaker.topic}</span></h4>
          </div>
          <div className="speaker-modal-section">
            <h5>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Biography
            </h5>
            <p id="sp-modal-bio">{speaker.bio}</p>
          </div>
          <div className="speaker-modal-section">
            <h5>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Keynote Presentation Abstract
            </h5>
            <p id="sp-modal-summary">{speaker.summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

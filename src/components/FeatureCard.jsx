import React, { useRef } from 'react'

export default function FeatureCard({ trackTag, title, description, children }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 16
    const rotateY = (x / rect.width) * 16
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
  }

  return (
    <div 
      className="feature-card" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {trackTag && <span className="track-tag">{trackTag}</span>}
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}

import React, { useRef, useEffect } from 'react'

export default function Marquee({ children }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  
  // Animation variables
  const offsetRef = useRef(0)
  const isHoveredRef = useRef(false)
  const animationFrameId = useRef(null)
  
  // Dragging state for mouse users
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startOffset = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!isHoveredRef.current && !isDragging.current) {
        // Auto scroll at a constant speed
        offsetRef.current -= 0.8 // 0.8px per frame (constant speed)
        
        // Loop seamlessly at 50% width (since marquee cards are duplicated)
        const halfWidth = track.scrollWidth / 2
        if (Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current = 0
        }
        
        track.style.transform = `translateX(${offsetRef.current}px)`
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  // Mouse hover state and cursor change (arrow pointer)
  const handleMouseEnter = () => {
    isHoveredRef.current = true
    if (containerRef.current) {
      containerRef.current.style.cursor = 'ew-resize'
    }
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    isDragging.current = false
    if (containerRef.current) {
      containerRef.current.style.cursor = 'default'
    }
  }

  // Touchpad/mousewheel scroll handling
  const handleWheel = (e) => {
    const track = trackRef.current
    if (!track) return
    
    const halfWidth = track.scrollWidth / 2
    // Use deltaX if available (horizontal scroll), fallback to deltaY (vertical scroll)
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY
    
    // Adjust manual scroll position
    offsetRef.current -= delta * 0.8

    // Keep offset within infinite bounds
    if (offsetRef.current > 0) {
      offsetRef.current = -halfWidth + (offsetRef.current % halfWidth)
    } else if (Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current = offsetRef.current % halfWidth
    }

    track.style.transform = `translateX(${offsetRef.current}px)`
  }

  // Dragging handlers
  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    startOffset.current = offsetRef.current
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const track = trackRef.current
    if (!track) return
    
    const halfWidth = track.scrollWidth / 2
    const dx = e.clientX - startX.current
    
    offsetRef.current = startOffset.current + dx

    // Keep offset within infinite bounds
    if (offsetRef.current > 0) {
      offsetRef.current = -halfWidth + (offsetRef.current % halfWidth)
    } else if (Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current = offsetRef.current % halfWidth
    }

    track.style.transform = `translateX(${offsetRef.current}px)`
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (containerRef.current) {
      containerRef.current.style.cursor = isHoveredRef.current ? 'ew-resize' : 'default'
    }
  }

  return (
    <div 
      className="ticker-marquee-wrapper" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ overflow: 'hidden', position: 'relative', userSelect: 'none' }}
    >
      <div 
        className="ticker-marquee-track" 
        ref={trackRef}
        style={{ display: 'flex', gap: '24px', width: 'max-content', willChange: 'transform', animation: 'none' }}
      >
        {children}
      </div>
    </div>
  )
}

import React, { useRef, useEffect } from 'react'

export default function Marquee({ children }) {
  const containerRef = useRef(null)
  const isHovered = useRef(false)
  const animFrameId = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastTime = performance.now()
    const speed = 45 // Pixels per second for auto-scroll

    const scroll = (time) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      if (!isHovered.current) {
        container.scrollLeft += speed * delta
        
        // Infinite loop boundary check
        const maxScroll = container.scrollWidth / 2
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= maxScroll
        }
      }

      animFrameId.current = requestAnimationFrame(scroll)
    }

    animFrameId.current = requestAnimationFrame(scroll)

    // Listen for wheel/touchpad gesture events
    const handleWheel = (e) => {
      // Use deltaX if swiping horizontally, otherwise deltaY for vertical wheel scroll
      const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY
      container.scrollLeft += scrollDelta
      
      const maxScroll = container.scrollWidth / 2
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft -= maxScroll
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += maxScroll
      }

      // Prevent the page from scrolling vertically when actively wheeling inside the marquee
      e.preventDefault()
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      cancelAnimationFrame(animFrameId.current)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="ticker-marquee-wrapper"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
      style={{
        overflowX: 'auto',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none' /* IE/Edge */
      }}
    >
      <div 
        className="ticker-marquee-track"
        style={{
          display: 'flex',
          gap: '24px',
          width: 'max-content',
          animation: 'none' /* Disable the CSS animation */
        }}
      >
        {children}
      </div>
    </div>
  )
}

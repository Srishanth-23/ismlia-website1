import React from 'react'

export default function BackgroundVideo() {
  return (
    <div className="bg-video-container">
      <video className="bg-video-player" playsInline autoPlay muted loop>
        <source src="/AI_looping_website_background_video_202608162100 (online-video-cutter.com).mp4" type="video/mp4" />
      </video>
      <div className="bg-video-overlay"></div>
    </div>
  )
}

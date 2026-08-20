import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundVideo from './components/BackgroundVideo'
import IntroVideo from './components/IntroVideo'
import SpeakerModal from './components/SpeakerModal'

import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Poster from './pages/Poster'

// Simple helper to scroll window to top on Route changes
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro only once per browser session for better UX
    const hasSeenIntro = sessionStorage.getItem('ismlia_seen_intro')
    return !hasSeenIntro
  })

  const [activeSpeakerId, setActiveSpeakerId] = useState(null)

  const handleCloseIntro = () => {
    sessionStorage.setItem('ismlia_seen_intro', 'true')
    setShowIntro(false)
  }

  return (
    <Router>
      <ScrollToTop />
      
      {/* Loop Background Video */}
      <BackgroundVideo />

      {/* Intro Loading Video */}
      {showIntro && <IntroVideo onClose={handleCloseIntro} />}

      {/* Main Layout */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home onSelectSpeaker={setActiveSpeakerId} />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/poster" element={<Poster />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Speaker Popup Modal */}
      <SpeakerModal 
        speakerId={activeSpeakerId} 
        onClose={() => setActiveSpeakerId(null)} 
      />

      <Footer />
    </Router>
  )
}

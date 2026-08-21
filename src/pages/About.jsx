import React, { useEffect, useRef } from 'react'
import FeatureCard from '../components/FeatureCard'
import Marquee from '../components/Marquee'

const timelineData = [
  {
    phase: "01",
    time: "09:00 AM – 09:30 AM",
    tagClass: "tag-cyan",
    tagText: "Registration",
    title: "Participant Check-in & Badge Distribution",
    desc: "Welcome check-in desk, delegate kit distribution, and morning greeting.",
    align: "left-item"
  },
  {
    phase: "02",
    time: "09:30 AM – 10:15 AM",
    tagClass: "tag-green",
    tagText: "Inauguration",
    title: "Symposium Inaugural Ceremony & Opening Remarks",
    desc: "Address by Patron Leadership & Convener Prof. S. Sundaramoorthy.",
    align: "right-item"
  },
  {
    phase: "03",
    time: "10:15 AM – 10:30 AM",
    tagClass: "tag-yellow",
    tagText: "Networking",
    title: "Morning High Tea & Break",
    desc: "Refreshment break and attendee interaction at the gallery lobby.",
    align: "left-item"
  },
  {
    phase: "04",
    time: "10:30 AM – 12:15 PM",
    tagClass: "tag-cyan",
    tagText: "Keynote Session I",
    title: "Technical Talks: Lecture I & Lecture II",
    desc: "Dr. Vijaysai Prasad (L&T) • Dr. Kanchi Lakshmi Kiran (DBS)",
    align: "right-item"
  },
  {
    phase: "05",
    time: "12:15 PM – 01:00 PM",
    tagClass: "tag-green",
    tagText: "Poster Competition",
    title: "Interactive Student & Scholar Poster Exhibition",
    desc: "Cash prize evaluation (Rs 5,000, 3,000 & 2,000) by International Chair.",
    align: "left-item"
  },
  {
    phase: "06",
    time: "01:00 PM – 02:00 PM",
    tagClass: "tag-yellow",
    tagText: "Buffet Lunch",
    title: "Networking Lunch",
    desc: "Grand dining hall banquet for all delegates and keynote speakers.",
    align: "right-item"
  },
  {
    phase: "07",
    time: "02:00 PM – 04:30 PM",
    tagClass: "tag-cyan",
    tagText: "Keynote Session II",
    title: "Technical Talks: Lecture III, IV & V",
    desc: "Dr. Raghuraj K Rao (AKXA) • Prof. Wu Zhe (NUS) • Prof. Ravindra Gudi (IIT Bombay)",
    align: "left-item"
  },
  {
    phase: "08",
    time: "04:30 PM – 05:15 PM",
    tagClass: "tag-green",
    tagText: "Panel Debate",
    title: "Panel Discussion: ML in Industrial Productivity",
    desc: "Interactive panel with international chairs on industrial deployment.",
    align: "right-item"
  },
  {
    phase: "09",
    time: "05:15 PM – 05:30 PM",
    tagClass: "tag-yellow",
    tagText: "Valedictory",
    title: "Valediction & Cash Prize Award Ceremony",
    desc: "Certificate distribution, award ceremony, and vote of thanks.",
    align: "left-item"
  }
]

export default function About() {
  const containerRef = useRef(null)
  const laserRef = useRef(null)

  useEffect(() => {
    const updateTimelineLaserOnScroll = () => {
      const container = containerRef.current
      const laser = laserRef.current
      if (!container || !laser) return

      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const totalHeight = rect.height
      const currentScroll = viewportHeight * 0.5 - rect.top
      let progressPercent = (currentScroll / totalHeight) * 100

      if (progressPercent < 0) progressPercent = 0
      if (progressPercent > 100) progressPercent = 100

      laser.style.height = `${progressPercent}%`

      // Activate nodes
      const items = container.querySelectorAll('.cyber-timeline-item')
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const itemTriggerPoint = viewportHeight * 0.65
        if (itemRect.top < itemTriggerPoint) {
          item.classList.add('active-node')
        } else {
          item.classList.remove('active-node')
        }
      })
    }

    window.addEventListener('scroll', updateTimelineLaserOnScroll)
    window.addEventListener('resize', updateTimelineLaserOnScroll)
    // Run initially
    updateTimelineLaserOnScroll()

    return () => {
      window.removeEventListener('scroll', updateTimelineLaserOnScroll)
      window.removeEventListener('resize', updateTimelineLaserOnScroll)
    }
  }, [])

  return (
    <div className="about-page">
      {/* About Content (Preamble & Scope at Top) */}
      <section className="section about-section" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header" style={{ maxWidth: '100%', margin: '0 0 40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <span className="section-tag" style={{ margin: 0 }}>Preamble & Scope</span>
            </div>
            <div style={{ maxWidth: '900px', textAlign: 'left', margin: '0 auto 0 0' }}>
              <h2 className="section-title">Industrial Applications of Machine Learning</h2>
              <p className="section-desc">
                Machine Learning (ML), an algorithmic approach to extracting meaningful information from data, is finding its
                way into an expanding range of fields, thanks to the power of modern-day computers in efficiently handling
                and processing vast amounts of data.
              </p>
            </div>
          </div>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '40px', marginBottom: '50px' }}>
            <div className="about-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderLeft: '4px solid var(--primary)', borderRadius: '12px', padding: '32px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M2 20h20"></path>
                  <path d="M5 17V8l4 4V8l4 4V8l4 4v5"></path>
                </svg>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0, fontWeight: '700' }}>Industrial Paradigm Shift</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>
                Although ML applications are ubiquitous in social networks, business, medical, and financial data analysis, it is beginning to establish itself as an inevitable tool to address and solve complex problems in industries. With the automation of industrial operations, capturing and storing sensor measurement data has become relatively easier.
              </p>
            </div>

            <div className="about-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #00f0ff', borderRadius: '12px', padding: '32px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M14 2H8"></path>
                  <path d="M11 2v10"></path>
                  <path d="M14 12A3 3 0 1 1 8 12a3 3 0 0 1 6 0Z"></path>
                  <path d="M12 15v5"></path>
                  <path d="M8 20h8"></path>
                </svg>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0, fontWeight: '700' }}>Our Mission & Objective</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>
                It is in this context that industries are beginning to look at ML as a potential tool to address complex problems that conventional methods have failed to solve. The International Symposium <strong style={{ color: 'var(--primary)' }}>ISMLIA 2026</strong> provides a platform for participants from industry, academia, and the research community to get a significant overview of potential areas for industrial applications of ML algorithms.
              </p>
            </div>
          </div>

          {/* Horizontal Continuous Moving Ticker Marquee Bar */}
          <Marquee>
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
          </Marquee>
        </div>
      </section>

      {/* Schedule Overview Section */}
      <section className="section schedule-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Programme Timetable</span>
            <h2 className="section-title">Schedule - 25th September 2026</h2>
          </div>

          <div className="cyber-timeline-container" ref={containerRef}>
            <div className="cyber-timeline-laser">
              <div className="cyber-laser-progress" id="cyber-laser-progress" ref={laserRef}></div>
            </div>

            {timelineData.map((item, index) => (
              <div key={index} className={`cyber-timeline-item ${item.align}`}>
                <div className="cyber-card">
                  <div className="cyber-phase-num">{item.phase}</div>
                  <div className="cyber-time">{item.time}</div>
                  <span className={`cyber-tag ${item.tagClass}`}>{item.tagText}</span>
                  <h3>{item.title}</h3>
                  {item.phase === "04" ? (
                    <p className="cyber-speakers">{item.desc}</p>
                  ) : item.phase === "07" ? (
                    <p className="cyber-speakers">{item.desc}</p>
                  ) : (
                    <p>{item.desc}</p>
                  )}
                </div>
                <div className="cyber-node-wrapper">
                  <div className="cyber-node-ring"></div>
                  <div className="cyber-node-dot"></div>
                </div>
                <div className="cyber-connector"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

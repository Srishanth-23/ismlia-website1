import React, { useEffect, useRef } from 'react'
import FeatureCard from '../components/FeatureCard'

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
    tagClass: "tag-pink",
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
    tagClass: "tag-pink",
    tagText: "Poster Competition",
    title: "Interactive Student & Scholar Poster Exhibition",
    desc: "Cash prize evaluation (Rs 10,000, 5,000 & 3,000) by International Chair.",
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
    tagClass: "tag-pink",
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
          <div className="section-header">
            <span className="section-tag">Preamble & Scope</span>
            <h2 className="section-title">Industrial Applications of Machine Learning</h2>
            <p className="section-desc">
              Machine Learning (ML), an algorithmic approach to extracting meaningful information from data, is finding its
              way into an expanding range of fields, thanks to the power of modern-day computers in efficiently handling
              and processing vast amounts of data.
            </p>
          </div>

          <div className="about-text-content">
            <p>
              Although ML applications are ubiquitous in social networks, business, medical, and financial data analysis,
              it is beginning to establish itself as an inevitable tool to address and solve complex problems in industries.
              With the automation of industrial operations, capturing and storing of sensor measurement data has become
              relatively easier. As a result of this, many industries have voluminous data that can be processed to get
              a deeper insight into plant conditions and effectively used to improve the quality of operation.
            </p>
            <p>
              It is in this context that industries are beginning to look at ML as a potential tool to address complex
              problems that conventional methods have failed to solve. This International Symposium <strong>ISMLIA 2026</strong>{' '}
              provides a platform for participants from industry, academia, and the research community to get a significant
              overview of potential areas for industrial applications of ML algorithms.
            </p>
          </div>

          {/* Horizontal Continuous Moving Ticker Marquee Bar */}
          <div className="ticker-marquee-wrapper" style={{ marginTop: '50px' }}>
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

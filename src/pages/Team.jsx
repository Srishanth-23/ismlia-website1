import React from 'react'
import { speakersData } from '../data/speakers'

const committeeData = [
  {
    role: "PATRON",
    members: [
      { name: "Shree P Sriram", desc: "Chairman, CIT" }
    ]
  },
  {
    role: "CO-PATRON",
    members: [
      { name: "Dr. A. Ramesh", desc: "Principal, CIT" }
    ]
  },
  {
    role: "PROGRAM ADVISOR",
    members: [
      { name: "Prof. S. Sundaramoorthy", desc: "Prof. (Emeritus), CIT" }
    ]
  },
  {
    role: "CHAIR (INTERNATIONAL)",
    members: [
      { name: "Prof. S. Lakshminarayanan", desc: "NUS, Singapore" }
    ]
  },
  {
    role: "CHAIR (NATIONAL)",
    members: [
      { name: "Dr. V. Srinivasa Rao", desc: "Dean, School of Computing" }
    ]
  },
  {
    role: "CO-CHAIRS",
    members: [
      { name: "Dr. R. Gowri", desc: "HOD, Department of CSE (AIML)" },
      { name: "Dr. B. Sundarambal", desc: "HOD, Department of CSBS" }
    ]
  },
  {
    role: "SECRETARY",
    members: [
      { name: "Dr. S. Pavithra", desc: "HOD, Department of CSE" }
    ]
  },
  {
    role: "JOINT SECRETARY",
    members: [
      { name: "Dr. N. Kandavel", desc: "Program Coordinator, Department of CSE (AIML)" }
    ]
  },
  {
    role: "TREASURER",
    members: [
      { name: "Dr. P. Karthikeyan", desc: "Professor, Department of CSE (AIML)" },
      { name: "Mr. G. Senthil Kumar", desc: "Professor, Department of CSBS" }
    ]
  },
  {
    role: "CONVENER, POSTER SESSION",
    members: [
      { name: "Dr. N. Kirubakaran", desc: "Associate Professor, Department of CSE (AIML)" },
      { name: "Ms. Haripriya L", desc: "Assistant Professor, Department of CSE (AIML)" }
    ]
  },
  {
    role: "MEMBERS",
    members: [
      { name: "Dr. J. Venkatesh", desc: "Professor" },
      { name: "Dr. S. Veeramalai", desc: "Professor" },
      { name: "Dr. A.R. Kavitha", desc: "Professor" },
      { name: "Dr. E. Kodhai", desc: "Professor" },
      { name: "Dr. G. Shanmugasundaram", desc: "Professor" },
      { name: "Dr. R. Basheer Mohammed", desc: "Professor" }
    ]
  }
]

const speakerThemes = {
  "1": { color: "#00f0ff", glow: "rgba(0, 240, 255, 0.25)", bg: "rgba(0, 240, 255, 0.05)", border: "rgba(0, 240, 255, 0.25)" },
  "2": { color: "#10b981", glow: "rgba(16, 185, 129, 0.25)", bg: "rgba(16, 185, 129, 0.05)", border: "rgba(16, 185, 129, 0.25)" },
  "3": { color: "#a855f7", glow: "rgba(168, 85, 247, 0.25)", bg: "rgba(168, 85, 247, 0.05)", border: "rgba(168, 85, 247, 0.25)" },
  "4": { color: "#ec4899", glow: "rgba(236, 72, 153, 0.25)", bg: "rgba(236, 72, 153, 0.05)", border: "rgba(236, 72, 153, 0.25)" },
  "5": { color: "#eab308", glow: "rgba(234, 179, 8, 0.25)", bg: "rgba(234, 179, 8, 0.05)", border: "rgba(234, 179, 8, 0.25)" }
}

export default function Team() {
  return (
    <div className="team-page">
      {/* Page Header Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="section-tag">Committee & Speakers</span>
          <h1 className="page-title">Symposium Team & Keynotes</h1>
          <p className="page-subtitle">Distinguished Patrons, Advisory Chairs, and International Keynote Speakers driving ISMLIA 2026</p>
        </div>
      </section>

      {/* Committee & Advisory Board */}
      <section className="section committee-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Patrons & Organizers</span>
            <h2 className="section-title">Symposium Committee</h2>
          </div>

          <div className="committee-grid">
            {committeeData.map((section, index) => {
              const isMembers = section.role === "MEMBERS"
              return (
                <div key={index} className={`committee-card ${isMembers ? 'members-card' : ''}`}>
                  <span className="committee-role">{section.role}</span>
                  <div className={`committee-member-list ${isMembers ? 'grid-2-col' : ''}`}>
                    {section.members.map((member, mIdx) => (
                      <div key={mIdx} className="committee-member-item">
                        <h4>{member.name}</h4>
                        <p>{member.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section speakers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Eminent Speakers</span>
            <h2 className="section-title">Keynote Lecturers & Talk Summaries</h2>
            <p className="section-desc">Distinguished experts sharing practical insights on using ML to solve complex industrial problems.</p>
          </div>

          <div className="speaker-detail-list">
            {Object.values(speakersData).map((sp) => {
              const theme = speakerThemes[sp.id] || { color: "#D4AF37", glow: "rgba(212, 175, 55, 0.25)", bg: "rgba(212, 175, 55, 0.05)", border: "rgba(212, 175, 55, 0.25)" }
              
              return (
                <div 
                  key={sp.id} 
                  className="speaker-detail-card" 
                  data-speaker-id={sp.id}
                  style={{
                    '--theme-color': theme.color,
                    '--theme-border': theme.border,
                    '--theme-glow': theme.glow
                  }}
                >
                  <div className="speaker-detail-header">
                    <div className="speaker-avatar" style={{ borderColor: theme.color, boxShadow: `0 0 15px ${theme.glow}` }}>
                      <img src={sp.image} alt={sp.name} />
                    </div>
                    <div className="speaker-meta">
                      <span 
                        className="lecture-badge" 
                        style={{ 
                          backgroundColor: theme.bg, 
                          color: theme.color, 
                          border: `1px solid ${theme.border}` 
                        }}
                      >
                        {sp.badge}
                      </span>
                      <h3>{sp.name}</h3>
                      <p className="speaker-designation" style={{ color: theme.color }}>{sp.designation}</p>
                    </div>
                  </div>
                  
                  <div className="talk-title-box" style={{ borderLeftColor: theme.color, backgroundColor: theme.bg }}>
                    <h4>Talk Title: {sp.topic}</h4>
                  </div>
                  
                  <div className="talk-body-grid">
                    <div className="talk-body-column">
                      <div className="column-header" style={{ color: theme.color }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Biography
                      </div>
                      <p>{sp.bio}</p>
                    </div>
                    
                    <div className="talk-body-column">
                      <div className="column-header" style={{ color: theme.color }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        Keynote Description
                      </div>
                      <p>{sp.summary}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

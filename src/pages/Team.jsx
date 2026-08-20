import React from 'react'
import { speakersData } from '../data/speakers'

const committeeData = [
  { role: "PATRON", name: "Shree Sriram Parthasarathy", desc: "Chairman, Chennai Institute of Technology" },
  { role: "Co-PATRON", name: "Prof. A. Ramesh", desc: "Principal, Chennai Institute of Technology" },
  { role: "Program Advisor", name: "Prof. S. Sundaramoorthy", desc: "Prof. (Emeritus), Chennai Institute of Technology" },
  { role: "CHAIR (International)", name: "Prof. S. Lakshminarayanan", desc: "National University of Singapore (NUS), Singapore" },
  { role: "CHAIR (National)", name: "Prof. & Head, CSE", desc: "Chennai Institute of Technology" },
  { role: "CHAIR (National)", name: "Prof. & Head, IT", desc: "Chennai Institute of Technology" }
]

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
            {committeeData.map((member, index) => (
              <div key={index} className="committee-card">
                <span className="committee-role">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.desc}</p>
              </div>
            ))}
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
            {Object.values(speakersData).map((sp) => (
              <div key={sp.id} className="speaker-detail-card" data-speaker-id={sp.id}>
                <div className="speaker-detail-header">
                  <div className="speaker-avatar">
                    <img src={sp.image} alt={sp.name} />
                  </div>
                  <div className="speaker-meta">
                    <span className="lecture-badge">{sp.badge}</span>
                    <h3>{sp.name}</h3>
                    <p className="speaker-designation">{sp.designation}</p>
                  </div>
                </div>
                <div className="talk-title-box">
                  <h4>Talk Title: {sp.topic}</h4>
                </div>
                <div className="talk-body">
                  <p><strong>Biography:</strong> {sp.bio}</p>
                  <p><strong>Keynote Description:</strong> {sp.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

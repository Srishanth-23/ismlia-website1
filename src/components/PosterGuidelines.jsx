import React, { useState } from 'react'

export default function PosterGuidelines() {
  const [activeTab, setActiveTab] = useState('rules')

  const rulesList = [
    "Open to UG/PG students.",
    "Teams of 1–3 members per poster.",
    "One entry per team; a participant cannot be part of multiple teams.",
    "Poster must present original work — ongoing project, mini-project, research work, or a well-researched application/case study of ML in an industry setting.",
    "Plagiarism or copied content will lead to disqualification.",
    "Poster size: A1 (594 × 841 mm), portrait orientation.",
    "Content must include: Title, Team details, Introduction/Problem Statement, Methodology/Approach, Results/Findings, Conclusion, References.",
    "Presenters must be present next to their poster during the judging window to explain their work and answer questions.",
    "Judges' decision is final.",
    "Institution reserves the right to reject entries not aligned with the theme or exceeding the deadline."
  ]

  const formatDetails = [
    { label: "Document Length", val: "1-page abstract maximum" },
    { label: "Word Count", val: "250 to 300 words maximum" },
    { label: "Typography Font", val: "Times New Roman, 12pt, single-spaced" },
    { label: "File Format", val: "PDF format (.pdf) only" },
    { label: "Required Structure", val: "Title, Team/Members' names + Reg No. + Department + Year, Track/Sub-theme, Abstract body, and Keywords." }
  ]

  return (
    <div className="poster-guidelines-box" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '30px', marginTop: '30px' }}>
      <div className="tabs-header" style={{ display: 'flex', gap: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
        <button 
          className={`btn ${activeTab === 'rules' ? 'btn-primary' : 'btn-glass'}`} 
          style={{ padding: '8px 20px', fontSize: '0.9rem' }} 
          onClick={() => setActiveTab('rules')}
        >
          Competition Rules
        </button>
        <button 
          className={`btn ${activeTab === 'format' ? 'btn-primary' : 'btn-glass'}`} 
          style={{ padding: '8px 20px', fontSize: '0.9rem' }} 
          onClick={() => setActiveTab('format')}
        >
          Abstract Format
        </button>
        <button 
          className={`btn ${activeTab === 'dates' ? 'btn-primary' : 'btn-glass'}`} 
          style={{ padding: '8px 20px', fontSize: '0.9rem' }} 
          onClick={() => setActiveTab('dates')}
        >
          Important Dates
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === 'rules' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="section-tag" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Competition Theme</span>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '4px 0' }}>Applications of Machine Learning in Industries</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Sub-Tracks:</strong> Manufacturing / Industry 4.0, Healthcare, FinTech, Telecom / Mobile / Edge Systems, and others.
              </p>
            </div>
            
            <ul style={{ listStyleType: 'decimal', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              {rulesList.map((rule, idx) => (
                <li key={idx} style={{ marginBottom: '8px', color: 'var(--text-light)' }}>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'format' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="section-tag" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>PDF Submission Requirements</span>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '4px 0' }}>Abstract Page Structure</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Abstracts must follow the strict structural format below to be accepted for review and stored in the symposium database.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              {formatDetails.map((detail, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{detail.label}</span>
                  <p style={{ color: '#FFFFFF', fontSize: '0.9rem', margin: '4px 0 0 0' }}>{detail.val}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h5 style={{ color: '#10b981', margin: '0 0 6px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>ℹ️</span> Abstract Layout Template
              </h5>
              <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                {"[1] Title of the Poster\n" +
                 "[2] Team Name / Members' Names + Reg No. + Department + Year\n" +
                 "[3] Track/Sub-theme (Manufacturing / Healthcare / FinTech / Telecom-Edge / Other)\n" +
                 "[4] Abstract (250–300 words covering: problem addressed, ML technique used, findings or expected outcomes, relevance to industry)\n" +
                 "[5] 3–5 Keywords"}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📅</div>
              <div>
                <h4 style={{ color: '#eab308', margin: '0 0 4px 0' }}>Abstract Submission Deadline</h4>
                <p style={{ color: '#FFFFFF', margin: '0', fontSize: '1.05rem', fontWeight: 'bold' }}>September 10, 2026</p>
                <p style={{ color: 'var(--text-muted)', margin: '2px 0 0 0', fontSize: '0.85rem' }}>Submit abstract in PDF format. Late submissions will not be considered.</p>
              </div>
            </div>

            <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📢</div>
              <div>
                <h4 style={{ color: '#00f0ff', margin: '0 0 4px 0' }}>Shortlist Announcement</h4>
                <p style={{ color: '#FFFFFF', margin: '0', fontSize: '1.05rem', fontWeight: 'bold' }}>September 13, 2026</p>
                <p style={{ color: 'var(--text-muted)', margin: '2px 0 0 0', fontSize: '0.85rem' }}>Shortlisted candidates will receive instructions to prepare an A1 size poster for physical presentation.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

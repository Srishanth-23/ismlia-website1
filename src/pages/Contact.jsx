import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const navigate = useNavigate()

  const contactList = [
    {
      name: "Dr. R. Gowri",
      role: "Co-Chair",
      designation: "HOD, Department of AIML",
      phone: "+91 9600973073",
      email: "gowri.r@citchennai.net"
    },
    {
      name: "Dr. P. Karthikeyan",
      role: "Treasurer",
      designation: "Professor, Department of AIML",
      phone: "+91 9677781595",
      email: "karthikeyan.p@citchennai.net"
    },
    {
      name: "Dr. N. Kandavel",
      role: "Joint Secretary",
      designation: "Program Coordinator, Department of AIML",
      phone: "+91 8072251996",
      email: "kandavel.n@citchennai.net"
    },
    {
      name: "Mr. G. Senthil Kumar",
      role: "Treasurer",
      designation: "Professor, Department of CSBS",
      phone: "+91 8939618019",
      email: "senthilkumar.g@citchennai.net"
    }
  ]

  const fullCommittee = [
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
        { name: "Dr. R. Gowri", desc: "HOD AIML" },
        { name: "Dr. B. Sundarambal", desc: "HOD CSBS" }
      ]
    },
    {
      role: "SECRETARY",
      members: [
        { name: "Dr. S. Pavithra", desc: "HOD CSE" }
      ]
    },
    {
      role: "JOINT SECRETARY",
      members: [
        { name: "Dr. N. Kandavel", desc: "Program Coordinator AIML" }
      ]
    },
    {
      role: "TREASURER",
      members: [
        { name: "Dr. P. Karthikeyan", desc: "Professor AIML" },
        { name: "Mr. G. Senthil Kumar", desc: "Professor CSBS" }
      ]
    },
    {
      role: "CONVENER, POSTER SESSION",
      members: [
        { name: "Dr. N. Kirubakaran", desc: "Associate Professor" },
        { name: "Mrs. Haripriya", desc: "Assistant Professor" }
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

  return (
    <div className="contact-page">
      {/* Page Header Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="section-tag">Get In Touch</span>
          <h1 className="page-title">Contact Secretariat</h1>
          <p className="page-subtitle">Connect with the Organizing Committee at Chennai Institute of Technology</p>
        </div>
      </section>

      {/* Main Contact Directory */}
      <section className="section contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Secretariat Desk</span>
            <h2 className="section-title">Reach Out to Us</h2>
            <p className="section-desc">Have questions regarding registration, poster paper submissions, or venue directions? We are here to assist you.</p>
          </div>

          {/* Quick Hotline Contacts Grid */}
          <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '60px' }}>
            {contactList.map((contact, idx) => (
              <div className="contact-card" key={idx} style={{ textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="contact-icon" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="committee-role" style={{ marginBottom: '8px' }}>{contact.role}</span>
                <h3>{contact.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>{contact.designation}</p>
                <a 
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                  className="btn btn-outline btn-full"
                  style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
                >
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Venue Address</h3>
              <p><strong>Chennai Institute of Technology</strong><br />SH-113, Sarathy Nagar, Kundrathur,<br />Chennai, Tamil Nadu - 600069, India</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>Email Secretariat</h3>
              <p><strong>Primary Info:</strong> ismlia2026@citchennai.net<br /><strong>Poster Session:</strong> posters.ismlia@citchennai.net</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 22h18"></path>
                  <path d="M6 18v-7"></path>
                  <path d="M10 18v-7"></path>
                  <path d="M14 18v-7"></path>
                  <path d="M18 18v-7"></path>
                  <path d="M12 2 3 7h18z"></path>
                </svg>
              </div>
              <h3>Organizing Departments</h3>
              <p>Department of Artificial Intelligence and Machine Learning <br />& Department of Computer Science and Business Systems </p>
            </div>
          </div>

          {/* Complete Organizing Committee Directory */}
          <div style={{ marginTop: '80px' }}>
            <div className="section-header">
              <span className="section-tag">Symposium Structure</span>
              <h2 className="section-title">Organizing Committee</h2>
            </div>
            
            <div className="committee-grid" style={{ marginTop: '30px' }}>
              {fullCommittee.map((section, index) => {
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

          {/* Registration Portal Redirect Card */}
          <div className="register-card-wrapper" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div className="register-info-col" style={{ background: 'rgba(212, 175, 55, 0.03)', padding: '40px' }}>
              <span className="section-tag" style={{ color: 'var(--primary)' }}>Registration Desk</span>
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginTop: '10px' }}>Secure Your Seat</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Join us at the One Day International Symposium on Machine Learning and its Industrial Applications (ISMLIA 2026) at Chennai Institute of Technology.
              </p>
              
              <div className="register-perks" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Access to all keynote sessions and panels</span>
                </div>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Includes high tea and networking lunch</span>
                </div>
                <div className="perk-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="perk-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Certificates issued by CIT Secretariat</span>
                </div>
              </div>
            </div>

            <div className="register-form-col" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
              <div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px' }}>Symposium Registration</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  All delegates (students, faculty, and industry professionals) must complete the registration process to obtain a valid pass and submit poster abstracts.
                </p>
              </div>

              <button 
                onClick={() => navigate('/register')} 
                className="btn btn-primary btn-full btn-lg" 
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px' }}
              >
                <span>Go to Registration Portal</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

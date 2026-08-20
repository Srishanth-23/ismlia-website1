import React from 'react'

export default function Contact() {
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
                <div className="contact-icon" style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
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
              <div className="contact-icon">📍</div>
              <h3>Venue Address</h3>
              <p><strong>Chennai Institute of Technology</strong><br />SH-113, Sarathy Nagar, Kundrathur,<br />Chennai, Tamil Nadu - 600069, India</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email Secretariat</h3>
              <p><strong>Primary Info:</strong> ismlia2026@citchennai.net<br /><strong>Poster Session:</strong> posters.ismlia@citchennai.net</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🏛️</div>
              <h3>Organizing Departments</h3>
              <p>Department of Computer Science & Engineering (AIML)<br />& Department of Information Technology (IT)</p>
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

        </div>
      </section>
    </div>
  )
}

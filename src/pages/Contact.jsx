import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    // Map element ids (contact-name, contact-email, etc) to state keys
    const stateKey = id.replace('contact-', '')
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const closeModal = () => {
    setShowModal(false)
  }

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

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Secretariat Desk</span>
            <h2 className="section-title">Reach Out to Us</h2>
            <p className="section-desc">Have questions regarding registration, poster paper submissions, or venue directions? We are here to assist you.</p>
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

          {/* Interactive Contact Form */}
          <div className="register-card-wrapper" style={{ marginTop: '60px' }}>
            <div className="register-info-col">
              <span className="section-tag">Direct Inquiry</span>
              <h2>Send a Message</h2>
              <p>Fill out the form to get a direct response from the ISMLIA organizing committee.</p>
            </div>

            <div className="register-form-col">
              <form className="registration-form" id="contact-inquiry-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Your Full Name *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className="form-control" 
                    placeholder="e.g. Dr. Rajesh Kumar" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className="form-control" 
                    placeholder="name@domain.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input 
                    type="text" 
                    id="contact-subject" 
                    className="form-control" 
                    placeholder="Poster Submission / Registration Inquiry" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea 
                    id="contact-message" 
                    className="form-control" 
                    rows="5" 
                    placeholder="Write your message details here..." 
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.6)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-sm)', 
                      color: 'white', 
                      padding: '12px', 
                      width: '100%', 
                      fontFamily: 'inherit' 
                    }}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg">
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} id="contact-modal">
        <div className="modal-box">
          <div className="modal-icon">📬</div>
          <h2>Message Sent!</h2>
          <p>Thank you for reaching out to the ISMLIA 2026 Organizing Secretariat at CIT. We will respond to your email shortly.</p>
          <button className="btn btn-primary" id="close-contact-modal-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

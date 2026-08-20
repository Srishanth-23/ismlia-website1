import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PosterGuidelines from '../components/PosterGuidelines'

export default function Register() {
  const location = useLocation()
  
  const registerSectionRef = useRef(null)

  const [formData, setFormData] = useState({
    pass: 'Student',
    fname: '',
    lname: '',
    email: '',
    org: '',
    designation: '',
    poster: 'No',
    pdfFile: null,
    txid: '',
    screenshotFile: null
  })

  const [ticketDetails, setTicketDetails] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (location.state?.scrollTarget === 'register' || location.hash === '#register') {
      registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
    if (location.state?.poster === 'Yes') {
      setFormData(prev => ({
        ...prev,
        poster: 'Yes'
      }))
    }
  }, [location])

  const selectPass = (passType) => {
    setFormData(prev => ({
      ...prev,
      pass: passType
    }))
    registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    const stateKey = id.replace('reg-', '')
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }))
  }

  const handleFileChange = (e) => {
    const { id } = e.target
    const file = e.target.files[0]
    if (id === 'reg-pdf') {
      setFormData(prev => ({
        ...prev,
        pdfFile: file
      }))
    } else if (id === 'reg-screenshot') {
      setFormData(prev => ({
        ...prev,
        screenshotFile: file
      }))
    }
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null)
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]
        resolve(base64String)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    const regId = 'ISMLIA-' + Math.floor(100000 + Math.random() * 900000)
    
    try {
      const pdfBase64 = formData.pdfFile ? await fileToBase64(formData.pdfFile) : null
      const screenshotBase64 = formData.screenshotFile ? await fileToBase64(formData.screenshotFile) : null
      
      const payload = {
        regId,
        pass: formData.pass,
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        org: formData.org,
        designation: formData.designation,
        poster: formData.poster,
        txid: formData.txid,
        pdfName: formData.pdfFile ? formData.pdfFile.name : null,
        pdfBase64,
        screenshotName: formData.screenshotFile ? formData.screenshotFile.name : null,
        screenshotMime: formData.screenshotFile ? formData.screenshotFile.type : null,
        screenshotBase64
      }

      // Paste your deployed Google Web App URL below
      const scriptUrl = 'YOUR_GOOGLE_SCRIPT_URL_HERE'
      
      let driveFolderUrl = 'https://drive.google.com/drive/folders/1b-T9_6l7E-vE_X-ismlia26-posters-placeholder'

      if (scriptUrl && scriptUrl !== 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Standard Apps Script submission mode
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(payload)
        })
      }

      setTicketDetails({
        regId,
        name: `${formData.fname} ${formData.lname}`,
        pass: formData.pass,
        org: formData.org,
        email: formData.email,
        poster: formData.poster,
        txid: formData.txid,
        pdfName: formData.pdfFile ? formData.pdfFile.name : null,
        screenshotName: formData.screenshotFile ? formData.screenshotFile.name : null,
        driveFolderUrl
      })
      
      setShowModal(true)
      
      setFormData({
        pass: 'Student',
        fname: '',
        lname: '',
        email: '',
        org: '',
        designation: '',
        poster: 'No',
        pdfFile: null,
        txid: '',
        screenshotFile: null
      })

      const fileInput = document.getElementById('reg-pdf')
      if (fileInput) fileInput.value = ''
      const screenshotInput = document.getElementById('reg-screenshot')
      if (screenshotInput) screenshotInput.value = ''
      
    } catch (err) {
      alert('Error during registration: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setTicketDetails(null)
  }

  return (
    <div className="register-page">
      {/* Page Header Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="section-tag">Online Registration Portal</span>
          <h1 className="page-title">Register for ISMLIA 2026</h1>
          <p className="page-subtitle">Select your pass category and submit your registration details below</p>
        </div>
      </section>

      {/* Ticket Pricing Grid */}
      <section className="section pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Registration Fee Categories</span>
            <h2 className="section-title">Select Your Pass</h2>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Academic Institutions (Students)</h3>
                <p className="pricing-subtitle">For Undergrad, Postgrad & PhD Scholars</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">250</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Access to all 5 Keynote Lectures</li>
                <li>Participation in Poster Competition</li>
                <li>Conference Kit & Lunch Included</li>
                <li>Official CIT Participation Certificate</li>
              </ul>
              <button 
                className="btn btn-outline btn-full select-pass-btn" 
                onClick={() => selectPass('Student')}
              >
                Select Student Pass
              </button>
            </div>

            <div className="pricing-card featured">
              <div className="popular-badge">Faculty</div>
              <div className="pricing-header">
                <h3>Academic Institutions (Faculty)</h3>
                <p className="pricing-subtitle">For Professors, Lecturers & Academic Researchers</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">500</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Full Symposium & Panel Discussion Access</li>
                <li>Networking session with International Keynotes</li>
                <li>Conference Kit, High Tea & Lunch</li>
                <li>Official CIT Faculty Delegate Certificate</li>
              </ul>
              <button 
                className="btn btn-primary btn-full select-pass-btn" 
                onClick={() => selectPass('Faculty')}
              >
                Select Faculty Pass
              </button>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Industry, R&D Laboratories</h3>
                <p className="pricing-subtitle">For Corporate R&D, Engineers & Industry Delegates</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span>
                <span className="amount">2,000</span>
                <span className="period">/ participant</span>
              </div>
              <ul className="pricing-features">
                <li>Full Access to Industrial Application Talks</li>
                <li>1-on-1 Interaction with Industry Leaders</li>
                <li>Executive Delegate Kit, High Tea & Lunch</li>
                <li>Certificate & Industry Partnership Access</li>
              </ul>
              <button 
                className="btn btn-outline btn-full select-pass-btn" 
                onClick={() => selectPass('Industry')}
              >
                Select Industry Pass
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Registration Form Section */}
      <section className="section register-section">
        <div className="container">
          <div className="register-card-wrapper" id="register" ref={registerSectionRef}>
            <div className="register-info-col">
              <span className="section-tag">Registration Portal</span>
              <h2>Register for ISMLIA 2026</h2>
              <p>Complete the form to confirm your registration for the One Day International Symposium at Chennai Institute of Technology.</p>
              
              <div className="register-perks">
                <div className="perk-item">
                  <span className="perk-icon">✓</span>
                  <span>Official CIT Secretariat Confirmation</span>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">✓</span>
                  <span>Includes High Tea & Networking Lunch</span>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">✓</span>
                  <span>Poster presentation eligibility for students</span>
                </div>
              </div>

              {/* QR Code payment display */}
              <div style={{ marginTop: '30px', padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', textAlign: 'center' }}>
                <span className="section-tag" style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '8px' }}>Scan & Pay</span>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: '0 0 16px 0' }}>Scan QR Code to Pay Fee</h4>
                <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', display: 'inline-block', maxWidth: '200px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', marginBottom: '14px' }}>
                  <img src="/payment-qr.jpg" alt="Payment QR Code" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} />
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                  UPI ID: <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>S363260chennaiins@mscbank</strong>
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', margin: 0, fontWeight: 'bold' }}>
                  Please save the transaction ID and screenshot to upload below.
                </p>
              </div>
            </div>

            <div className="register-form-col">
              <form className="registration-form" id="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="reg-pass">Registration Category *</label>
                  <select 
                    id="reg-pass" 
                    required 
                    className="form-control"
                    value={formData.pass}
                    onChange={handleInputChange}
                  >
                    <option value="Student">Academic Institutions - Student (₹ 250)</option>
                    <option value="Faculty">Academic Institutions - Faculty (₹ 500)</option>
                    <option value="Industry">Industry & R&D Laboratories (₹ 2,000)</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reg-fname">First Name *</label>
                    <input 
                      type="text" 
                      id="reg-fname" 
                      className="form-control" 
                      placeholder="e.g. Rahul" 
                      value={formData.fname}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-lname">Last Name *</label>
                    <input 
                      type="text" 
                      id="reg-lname" 
                      className="form-control" 
                      placeholder="e.g. Sharma" 
                      value={formData.lname}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="reg-email" 
                    className="form-control" 
                    placeholder="name@institution.edu.in" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reg-org">Institution / Company *</label>
                    <input 
                      type="text" 
                      id="reg-org" 
                      className="form-control" 
                      placeholder="e.g. CIT / L&T" 
                      value={formData.org}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-designation">Department / Designation *</label>
                    <input 
                      type="text" 
                      id="reg-designation" 
                      className="form-control" 
                      placeholder="e.g. CSE / Student / Assistant Prof" 
                      value={formData.designation}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-poster">Participating in Poster Session?</label>
                  <select 
                    id="reg-poster" 
                    className="form-control"
                    value={formData.poster}
                    onChange={handleInputChange}
                  >
                    <option value="No">No, Attending Sessions Only</option>
                    <option value="Yes">Yes, Submitting Poster Abstract</option>
                  </select>
                </div>

                {/* Payment transaction details */}
                <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment Verification</h4>
                  
                  <div className="form-group">
                    <label htmlFor="reg-txid">Transaction ID / UTR Number *</label>
                    <input 
                      type="text" 
                      id="reg-txid" 
                      className="form-control" 
                      placeholder="e.g. TXN1234567890" 
                      value={formData.txid}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="form-group animate-fade-in" style={{ border: '1px dashed rgba(212, 175, 55, 0.3)', padding: '16px', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.02)', marginTop: '16px' }}>
                    <label htmlFor="reg-screenshot" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Upload Payment Screenshot *</label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Please upload a screenshot of your payment confirmation (JPEG/PNG).
                    </p>
                    <input 
                      type="file" 
                      id="reg-screenshot" 
                      accept="image/*" 
                      className="form-control" 
                      required 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {formData.poster === 'Yes' && (
                  <div className="form-group animate-fade-in" style={{ border: '1px dashed var(--primary)', padding: '16px', borderRadius: '8px', marginTop: '16px', background: 'rgba(0, 240, 255, 0.03)' }}>
                    <label htmlFor="reg-pdf" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Upload Abstract (PDF Format) *</label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Please select your 1-page PDF abstract (max 300 words, Times New Roman, 12pt). Submissions are directly archived in the symposium Google Drive.
                    </p>
                    <input 
                      type="file" 
                      id="reg-pdf" 
                      accept=".pdf" 
                      className="form-control" 
                      required 
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
                  <span>{submitting ? 'Submitting Registration...' : 'Submit Registration'}</span>
                  {!submitting && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} id="success-modal">
        <div className="modal-box">
          <div className="modal-icon" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Registration Submitted!</h2>
          <p id="modal-msg">Thank you for registering for ISMLIA 2026 at Chennai Institute of Technology. Your registration badge details are listed below:</p>
          <div className="modal-ticket-details" id="ticket-summary">
            {ticketDetails && (
              <div style={{ lineHeight: '1.8' }}>
                <p><strong>Registration ID:</strong> {ticketDetails.regId}</p>
                <p><strong>Attendee Name:</strong> {ticketDetails.name}</p>
                <p><strong>Pass Category:</strong> {ticketDetails.pass} Pass</p>
                <p><strong>Organization:</strong> {ticketDetails.org}</p>
                <p><strong>Confirmation Email:</strong> {ticketDetails.email}</p>
                <p><strong>Transaction UTR:</strong> {ticketDetails.txid}</p>
                {ticketDetails.screenshotName && (
                  <p><strong>Receipt:</strong> {ticketDetails.screenshotName} <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>(Pending Verification)</span></p>
                )}
                {ticketDetails.poster === 'Yes' && (
                  <div style={{ marginTop: '15px', padding: '16px', background: 'rgba(0, 240, 255, 0.05)', border: '1px dashed var(--primary)', borderRadius: '8px', textAlign: 'left' }}>
                    <p style={{ color: 'var(--primary)', margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Google Drive Submission Folder Created:
                    </p>
                    <p style={{ color: '#FFFFFF', margin: '0 0 10px 0', fontSize: '0.8rem', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px' }}>
                      {`ISMLIA_2026_Posters / ${ticketDetails.regId}_${ticketDetails.name.replace(/\s+/g, '_')}`}
                    </p>
                    <p style={{ color: 'var(--text-muted)', margin: '0 0 12px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      Your abstract PDF has been moved and structured into this dedicated drive folder with your participant details.
                    </p>
                    <a 
                      href={ticketDetails.driveFolderUrl || "https://drive.google.com/drive/folders/1b-T9_6l7E-vE_X-ismlia26-posters-placeholder"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-full btn-sm"
                      style={{ fontSize: '0.8rem', padding: '6px 12px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                      Open Google Drive Folder
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="btn btn-primary" id="close-modal-btn" onClick={closeModal}>Done</button>
        </div>
      </div>
    </div>
  )
}

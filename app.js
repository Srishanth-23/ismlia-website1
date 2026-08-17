// ISMLIA 2026 Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Intro Video Title Card Loading Screen Management
    const introOverlay = document.getElementById('video-intro-overlay');
    const introPlayer = document.getElementById('intro-video-player');
    const skipIntroBtn = document.getElementById('skip-intro-btn');

    function closeIntroVideo() {
        if (introOverlay) {
            introOverlay.classList.add('fade-out');
        }
    }

    if (introPlayer) {
        introPlayer.addEventListener('ended', () => {
            closeIntroVideo();
        });
    }

    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', () => {
            if (introPlayer) introPlayer.pause();
            closeIntroVideo();
        });
    }

    // 1. Sticky Navigation & Scrollspy
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link scrollspy
        let currentSection = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close nav on click link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3D Motion Tilt Effect for Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 16;
            const rotateY = (x / rect.width) * 16;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 2. Countdown Timer Logic
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 68); // 68 days in future

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const cdDays = document.getElementById('cd-days');
        const cdHours = document.getElementById('cd-hours');
        const cdMins = document.getElementById('cd-mins');
        const cdSecs = document.getElementById('cd-secs');

        if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
        if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
        if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
        if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Schedule Tabs Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // 4. Ticket Pass Selection Integration
    const selectPassBtns = document.querySelectorAll('.select-pass-btn');
    const passSelectInput = document.getElementById('reg-pass');

    selectPassBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const passType = btn.getAttribute('data-pass');
            if (passSelectInput) {
                passSelectInput.value = passType;
            }
            const regSection = document.getElementById('register');
            if (regSection) {
                regSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Quick Hero CTA & Nav CTA
    const heroRegBtn = document.getElementById('hero-register-btn');
    const navRegBtn = document.getElementById('open-register-nav');

    const scrollToRegister = (e) => {
        e.preventDefault();
        const regSection = document.getElementById('register');
        if (regSection) {
            regSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (heroRegBtn) heroRegBtn.addEventListener('click', scrollToRegister);
    if (navRegBtn) navRegBtn.addEventListener('click', scrollToRegister);

    // 5. Registration Form Submit Handling & Modal
    const regForm = document.getElementById('registration-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const ticketSummary = document.getElementById('ticket-summary');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fname = document.getElementById('reg-fname').value;
            const lname = document.getElementById('reg-lname').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-pass').value;
            const org = document.getElementById('reg-org').value;
            const regId = 'ISMLIA-' + Math.floor(100000 + Math.random() * 900000);

            if (ticketSummary) {
                ticketSummary.innerHTML = `
                    <div style="line-height: 1.8;">
                        <p><strong>Registration ID:</strong> ${regId}</p>
                        <p><strong>Attendee Name:</strong> ${fname} ${lname}</p>
                        <p><strong>Pass Category:</strong> ${pass} Pass</p>
                        <p><strong>Organization:</strong> ${org}</p>
                        <p><strong>Confirmation Email:</strong> ${email}</p>
                    </div>
                `;
            }

            if (successModal) {
                successModal.classList.add('active');
            }

            regForm.reset();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (successModal) successModal.classList.remove('active');
        });
    }

    // 6. Contact Inquiry Form Handler
    const contactForm = document.getElementById('contact-inquiry-form');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (contactModal) contactModal.classList.add('active');
            contactForm.reset();
        });
    }

    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener('click', () => {
            if (contactModal) contactModal.classList.remove('active');
        });
    }

    // 7. Scroll-Driven Cyber Timeline Laser & Node Activation
    const timelineContainer = document.querySelector('.cyber-timeline-container');
    const laserProgress = document.getElementById('cyber-laser-progress');
    const timelineItems = document.querySelectorAll('.cyber-timeline-item');

    function updateTimelineLaserOnScroll() {
        if (!timelineContainer || !laserProgress) return;

        const rect = timelineContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through timeline section
        const totalHeight = rect.height;
        const currentScroll = viewportHeight * 0.5 - rect.top;
        let progressPercent = (currentScroll / totalHeight) * 100;

        if (progressPercent < 0) progressPercent = 0;
        if (progressPercent > 100) progressPercent = 100;

        // Dynamic laser growth height
        laserProgress.style.height = `${progressPercent}%`;

        // Activate timeline nodes as laser reaches them
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemTriggerPoint = viewportHeight * 0.65;
            if (itemRect.top < itemTriggerPoint) {
                item.classList.add('active-node');
            } else {
                item.classList.remove('active-node');
            }
        });
    }

    window.addEventListener('scroll', updateTimelineLaserOnScroll);
    window.addEventListener('resize', updateTimelineLaserOnScroll);
    updateTimelineLaserOnScroll();

    // 8. Speaker Profile Popup Modal Handler
    const speakersData = {
        "1": {
            badge: "LECTURE I",
            avatar: "VJ",
            image: "ChatGPT Image Aug 17, 2026, 06_16_09 AM.png",
            name: "Dr. Vijaysai Prasad",
            designation: "JGM & Head, Water Technology Centre, L&T Constructions, Chennai, India",
            topic: "Operational Excellence in Water Industry through Grey Box Digital Twins",
            bio: "Dr. Vijaysai Prasad (VJ) heads WTC Kanchipuram at L&T's WET business. With nearly three decades of experience in industrial research, he holds a Ph.D. from IIT Bombay, served at GE Global Research Center, GE Water, and SUEZ Water Technologies. He serves on jury committees for DST desalination proposals and Steering Committees for IWA & Digital Water India.",
            summary: "Presents the principles and implementation of grey-box digital twins, combining first-principles physics models with data-driven AI/ML, using a reverse osmosis (RO) desalination plant as a real industrial case study."
        },
        "2": {
            badge: "LECTURE II",
            avatar: "LK",
            image: "ChatGPT Image Aug 17, 2026, 06_20_39 AM.png",
            name: "Dr. Kanchi Lakshmi Kiran",
            designation: "Senior Vice President, Regional Business Analytics, DBS, Singapore",
            topic: "AI Transformation Era: Role of Agentic AI and its role of Real-Time Value-Driven implementation in Industrial Applications",
            bio: "Technology leader with 16 years of experience across AI, big data, and engineering. Currently leads Agentic AI at DBS, Singapore. Previously Lead/Senior Data Scientist at McLaren Applied Technologies and Senior Research Engineer at Yokogawa. Holds 4 international patents and a Ph.D. from NUS.",
            summary: "Explores the shift to autonomous goal-directed Agentic AI, multi-agent frameworks, operational safety guardrails, shadow rollouts, and real-time value-driven implementations across energy, smart manufacturing, and finance."
        },
        "3": {
            badge: "LECTURE III",
            avatar: "RR",
            image: "ChatGPT Image Aug 17, 2026, 06_24_35 AM.png",
            name: "Dr. Raghuraj K Rao",
            designation: "Managing Director and Head Technical Services, AKXA TECH Pvt. Ltd, Kolhapur, India",
            topic: "Multi Agent Systems for Process Diagnosis and Control",
            bio: "Chemical Engineer (BE: NITK Surathkal, M.Tech: IIT Bombay, Ph.D.: NUS Singapore) with over 25 years of academic, research, and commissioning experience. Founder Director & MD of AKXA Tech, delivering algorithm-based analytics tools for manufacturing stability and energy efficiency.",
            summary: "Provides a bird's-eye view on operational excellence, process fault diagnosis, prediction, and real-time process optimization using Agentic Multi-Agent Systems in Industry 4.0 setups."
        },
        "4": {
            badge: "LECTURE IV",
            avatar: "WZ",
            image: "ChatGPT Image Aug 17, 2026, 06_32_37 AM.png",
            name: "Prof. Wu Zhe",
            designation: "Assistant Professor, Department of Chemical & Biomolecular Engineering, National University of Singapore (NUS)",
            topic: "Machine Learning in Model Predictive Control: Theoretical and Practical Challenges",
            bio: "Ph.D. from UCLA (2020), postdoctoral researcher at UCLA Computer Science. Published over 50 peer-reviewed articles, recipient of NUS Outstanding Early Career Award (2024), AIChE Singapore Young Faculty Award (2024), and Stanford Top 2% Scientist (2024, 2025).",
            summary: "Presents a general framework of using Recurrent Neural Networks (RNN) for modeling nonlinear dynamic systems within Model Predictive Control (MPC), addressing data scarcity via physics-informed ML and transfer learning."
        },
        "5": {
            badge: "LECTURE V",
            avatar: "RG",
            image: "ChatGPT Image Aug 17, 2026, 06_38_37 AM.png",
            name: "Prof. Ravindra Gudi",
            designation: "AI and ML Chair Professor & Deputy Director, IIT Bombay, India",
            topic: "Hybrid First-Principles ML Models for Chemical Process Operations",
            bio: "Deputy Director (Provost equivalent) at IIT Bombay. Former Dean (Alumni & Corporate Relations) and Head of Chemical Engineering. Fellow of INAE, NASI, and IIChE. Author of 200+ Scopus papers and 11 US patents.",
            summary: "Explores complementing data-driven AI/ML approaches with physics/mechanistic knowledge representation systems to improve model credibility, accuracy, and industrial decision-making."
        }
    };

    function ensureSpeakerModalExists() {
        let modal = document.getElementById('speaker-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal-overlay speaker-modal-overlay';
            modal.id = 'speaker-modal';
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('role', 'dialog');
            modal.innerHTML = `
                <div class="speaker-modal-box">
                    <button class="speaker-modal-close" id="close-speaker-modal" aria-label="Close Profile Modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div class="speaker-modal-header">
                        <span class="lecture-badge" id="sp-modal-badge">LECTURE I</span>
                        <div class="speaker-modal-avatar-circle" id="sp-modal-avatar">VJ</div>
                        <h2 id="sp-modal-name">Dr. Vijaysai Prasad</h2>
                        <p class="speaker-modal-designation" id="sp-modal-designation">JGM & Head, Water Technology Centre, L&T Constructions, Chennai, India</p>
                    </div>
                    <div class="speaker-modal-content">
                        <div class="talk-title-box">
                            <h4>Talk Title: <span id="sp-modal-topic">Operational Excellence in Water Industry through Grey Box Digital Twins</span></h4>
                        </div>
                        <div class="speaker-modal-section">
                            <h5>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Biography
                            </h5>
                            <p id="sp-modal-bio"></p>
                        </div>
                        <div class="speaker-modal-section">
                            <h5>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                Keynote Presentation Abstract
                            </h5>
                            <p id="sp-modal-summary"></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        return modal;
    }

    function openSpeakerModal(speakerId) {
        const data = speakersData[speakerId] || speakersData["1"];
        const modal = ensureSpeakerModalExists();

        const badgeEl = document.getElementById('sp-modal-badge');
        const avatarEl = document.getElementById('sp-modal-avatar');
        const nameEl = document.getElementById('sp-modal-name');
        const desigEl = document.getElementById('sp-modal-designation');
        const topicEl = document.getElementById('sp-modal-topic');
        const bioEl = document.getElementById('sp-modal-bio');
        const summaryEl = document.getElementById('sp-modal-summary');

        if (badgeEl) badgeEl.textContent = data.badge;
        if (avatarEl) {
            if (data.image) {
                avatarEl.innerHTML = `<img src="${data.image}" alt="${data.name}">`;
            } else {
                avatarEl.textContent = data.avatar;
            }
        }
        if (nameEl) nameEl.textContent = data.name;
        if (desigEl) desigEl.textContent = data.designation;
        if (topicEl) topicEl.textContent = data.topic;
        if (bioEl) bioEl.textContent = data.bio;
        if (summaryEl) summaryEl.textContent = data.summary;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSpeakerModal() {
        const modal = document.getElementById('speaker-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Attach click triggers to speaker cards and View Full Profile links/buttons
    document.addEventListener('click', (e) => {
        const profileBtn = e.target.closest('.view-profile-btn, .speaker-link');
        const speakerCard = e.target.closest('.speaker-home-card');

        if (profileBtn) {
            e.preventDefault();
            const speakerId = profileBtn.getAttribute('data-speaker-id') || (speakerCard && speakerCard.getAttribute('data-speaker-id')) || "1";
            openSpeakerModal(speakerId);
            return;
        }

        if (speakerCard) {
            const speakerId = speakerCard.getAttribute('data-speaker-id') || "1";
            openSpeakerModal(speakerId);
            return;
        }

        // Close button click
        if (e.target.closest('#close-speaker-modal')) {
            closeSpeakerModal();
            return;
        }

        // Overlay click outside modal box
        const modalOverlay = e.target.closest('.speaker-modal-overlay');
        if (modalOverlay && e.target === modalOverlay) {
            closeSpeakerModal();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSpeakerModal();
        }
    });
});

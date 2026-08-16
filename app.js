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
});

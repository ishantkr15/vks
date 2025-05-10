document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU FUNCTIONALITY ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Event listeners for mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // ========== HERO SLIDER FUNCTIONALITY ==========
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots for slider
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Navigation controls
        document.querySelector('.next-slide')?.addEventListener('click', nextSlide);
        document.querySelector('.prev-slide')?.addEventListener('click', prevSlide);
        
        // Auto slide change
        startSlideInterval();
        
        function nextSlide() {
            goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
        }
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Reset timer when manually changing slides
            resetSlideInterval();
        }
        
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }
    }

    // ========== CURRICULUM TAB FUNCTIONALITY ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // If this is the senior secondary tab, activate first stream by default
                if (tabId === 'senior') {
                    activateFirstStream();
                }
            });
        });
    }

    // Stream Tab Functionality (for Senior Secondary)
    function activateFirstStream() {
        const streamBtns = document.querySelectorAll('.stream-btn');
        const streamContents = document.querySelectorAll('.stream-content');
        
        // Activate first stream by default if none is active
        if (streamBtns.length > 0 && !document.querySelector('.stream-btn.active')) {
            streamBtns[0].classList.add('active');
            streamContents[0].classList.add('active');
        }
        
        // Add click event for stream buttons
        streamBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                streamBtns.forEach(btn => btn.classList.remove('active'));
                streamContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const streamId = this.getAttribute('data-stream');
                document.getElementById(streamId).classList.add('active');
            });
        });
    }

    // Initialize first stream if senior tab is active by default
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab && activeTab.getAttribute('data-tab') === 'senior') {
        activateFirstStream();
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== SCROLL ANIMATIONS ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.feature-card, .stat-item, .testimonial-card, .announcement-card, ' +
            '.curriculum-section, .academic-calendar, .assessment-section, ' +
            '.term-card, .assessment-card, .facility-card, .grid-item, .gallery-item'
        );
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                // Add staggered delay based on index
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('animate-fade-in-up');
            }
        });
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ========== HOVER ANIMATIONS ==========
    // Subject and feature items
    const listItems = document.querySelectorAll('.subjects li, .features li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Assessment cards
    const assessmentCards = document.querySelectorAll('.assessment-card');
    assessmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'rotateY(180deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'rotateY(0)';
        });
    });

    // ========== FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Show error message
                alert('There was a problem sending your message. Please try again later or contact us directly.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ========== FAQ ACCORDION ==========
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle show class on answer
            answer.classList.toggle('show');
            
            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
        });
    });

    // ========== FOOTER YEAR UPDATE ==========
    document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} VKS Public School, Majhola. All Rights Reserved.`;
});
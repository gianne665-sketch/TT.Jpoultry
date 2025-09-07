// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // WhatsApp buttons functionality
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const phone = '254792080858'; // Changed phone number
            const message = `Hi, I'm interested in ${product}`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // Update WhatsApp float button based on product page
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        const path = window.location.pathname;
        if (path.includes('products/')) {
            const productName = document.querySelector('h1').textContent.trim();
            whatsappFloat.href = `https://wa.me/254792080858?text=Hi,%20I'm%20interested%20in%20your%20${encodeURIComponent(productName)}`;
        }
    }
    
    // Simple testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.opacity = '1';
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
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
    
    // Language switcher functionality
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // In a real implementation, this would redirect to the appropriate language version
            console.log(`Switching to ${selectedLanguage} version`);
            // For demo purposes, we'll just show an alert
            alert(`This would switch to ${selectedLanguage} version in a real implementation`);
        });
    }
});

// Footer Year Update
document.getElementById("year").textContent = new Date().getFullYear();

 // Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (!name || !phone || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            alert('Thank you for your message! We will contact you shortly.');
            this.reset();
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Gallery Lightbox
    if (document.querySelector('.gallery-grid')) {
        lightGallery(document.querySelector('.gallery-grid'), {
            selector: '.gallery-item',
            download: false
        });
    }
    
    // Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn, .category-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab') || this.getAttribute('data-category');
            
            // Remove active class from all buttons and contents
            const btnClass = this.classList.contains('tab-btn') ? 'tab-btn' : 'category-btn';
            const contentClass = this.classList.contains('tab-btn') ? 'tab-content' : 'faq-category';
            
            document.querySelectorAll(`.${btnClass}`).forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`.${contentClass}`).forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Process Steps Animation
    const steps = document.querySelectorAll('.step');
    if (steps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.5s ease';
            observer.observe(step);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length === 0) return;

    // Prepare animation data
    const animations = [];
    
    statItems.forEach(item => {
        const numberElement = item.querySelector('h3');
        const text = numberElement.textContent;
        
        // Skip if no numbers found (like "Countrywide")
        if (!text.match(/\d/)) {
            return; // Skip this item
        }
        
        // Extract number and symbols
        const number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        
        // Store animation data
        animations.push({
            element: numberElement,
            target: number,
            hasPlus,
            hasPercent
        });
        
        // Initialize at 0 with correct symbols
        numberElement.textContent = `0${hasPlus ? '+' : ''}${hasPercent ? '%' : ''}`;
    });

    // Animation function
    function animateValue(el, start, end, hasPlus, hasPercent) {
        let startTime = null;
        const duration = 2000;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format the number
            let displayValue;
            if (end >= 1000) {
                displayValue = value.toLocaleString();
            } else {
                displayValue = value.toString();
            }
            
            // Add symbols
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            el.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Check if element is visible
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }

    // Start animations when visible
    function checkScroll() {
        if (isInViewport(statsSection)) {
            animations.forEach(anim => {
                animateValue(anim.element, 0, anim.target, anim.hasPlus, anim.hasPercent);
            });
            window.removeEventListener('scroll', checkScroll);
        }
    }

    // Set up listeners
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check immediately if already visible
});

// Live Chicken Pricing Calculator
document.addEventListener('DOMContentLoaded', function() {
    const chickenType = document.getElementById('chicken-type');
    const quantity = document.getElementById('quantity');
    const unitPrice = document.getElementById('unit-price');
    const displayQuantity = document.getElementById('display-quantity');
    const totalPrice = document.getElementById('total-price');
    
    // Pricing data
    const prices = {
        broiler: 1200,
        layer: 1500,
        kienyeji: 1800,
        parent: 2500
    };
    
    // Update price display
    function updatePrice() {
        const selectedType = chickenType.value;
        const qty = parseInt(quantity.value) || 0;
        
        if (selectedType && prices[selectedType]) {
            const price = prices[selectedType];
            const total = price * qty;
            
            unitPrice.textContent = `KSh ${price.toLocaleString()}`;
            displayQuantity.textContent = qty;
            totalPrice.textContent = `KSh ${total.toLocaleString()}`;
        } else {
            unitPrice.textContent = 'KSh 0';
            displayQuantity.textContent = '0';
            totalPrice.textContent = 'KSh 0';
        }
    }
    
    // Event listeners
    chickenType.addEventListener('change', updatePrice);
    quantity.addEventListener('input', updatePrice);
    
    // Form submission
    document.querySelector('.order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = chickenType.options[chickenType.selectedIndex].text;
        const qty = quantity.value;
        const location = document.getElementById('delivery-location').value;
        
        // Create WhatsApp message
        const message = `Hello TT&J Poultry,\n\nI would like to order:\n\n` +
                        `• Chicken Type: ${type}\n` +
                        `• Quantity: ${qty}\n` +
                        `• Delivery Location: ${location}\n\n` +
                        `Please advise on delivery arrangements.`;
        
        // Encode for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/254792080858?text=${encodedMessage}`, '_blank');
    });
    
    // Initialize
    updatePrice();
});
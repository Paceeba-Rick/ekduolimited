// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

  // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Skip for links that don't have a target
                if (this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate position, offset by 20px for spacing
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add highlight animation
                    targetElement.classList.add('highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 1500);
                }
            });
        });
        
        // Highlight target when page loads with hash
        window.addEventListener('load', function() {
            if (window.location.hash) {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.classList.add('highlight');
                        setTimeout(() => {
                            targetElement.classList.remove('highlight');
                        }, 1500);
                    }, 500);
                }
            }
        });


        // Fixed animation for stats - now handles percentages and plus signs
        document.addEventListener('DOMContentLoaded', function() {
            const statsSection = document.querySelector('.stats-section');
            const statNumbers = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const originalText = stat.innerText;
                            // Extract the numeric value (remove % and +)
                            let target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
                            
                            // If we have a percentage sign, we'll need to add it back later
                            const isPercentage = originalText.includes('%');
                            const hasPlus = originalText.includes('+');
                            
                            // If we couldn't parse a number, skip this stat
                            if (isNaN(target)) return;
                            
                            let count = 0;
                            const increment = target / 30;
                            
                            const updateCount = () => {
                                if (count < target) {
                                    let displayValue = Math.ceil(count);
                                    // Add back the symbols as needed
                                    if (isPercentage) displayValue += '%';
                                    if (hasPlus) displayValue += '+';
                                    stat.innerText = displayValue;
                                    count += increment;
                                    setTimeout(updateCount, 50);
                                } else {
                                    // Final value with symbols
                                    let displayValue = target;
                                    if (isPercentage) displayValue += '%';
                                    if (hasPlus) displayValue += '+';
                                    stat.innerText = displayValue;
                                }
                            };
                            
                            updateCount();
                        });
                        
                        // Stop observing after animation
                        observer.unobserve(statsSection);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        });














// Gallery Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.gallery-img').src;
        const imgAlt = item.querySelector('.gallery-img').alt;
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Gallery Filtering
const galleryCategories = document.querySelectorAll('.gallery-category');
galleryCategories.forEach(category => {
    category.addEventListener('click', function() {
        // Remove active class from all categories
        galleryCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked category
        this.classList.add('active');
        
        const filter = this.textContent;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const categoryName = item.querySelector('.gallery-overlay h3').textContent;
            
            if (filter === 'All Photos' || categoryName.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                alert('Thank you for your message! We will respond within 24 hours.');
                contactForm.reset();
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
        }
    });
}

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Initialize animations when elements enter viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// WhatsApp Float Button
document.querySelector('.whatsapp-float').addEventListener('click', function(e) {
    e.preventDefault();
    const phone = '+2330503842570';
    window.open(`https://wa.me/${phone}`, '_blank');
});
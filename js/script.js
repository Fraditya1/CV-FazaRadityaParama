document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- Scroll Animation Observer ---
    const sectionsToAnimate = document.querySelectorAll('section[id]');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectionsToAnimate.forEach(section => {
        if(section.id !== 'home') { // Don't hide the home section initially
            section.classList.add('section-hidden');
            animationObserver.observe(section);
        }
    });

    // --- Navigation Highlighting Observer ---
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sectionsToAnimate.forEach(section => {
        navObserver.observe(section);
    });

    // --- Code to display form success message ---
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const successMessage = document.getElementById('form-success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
    }
});
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

<<<<<<< HEAD
    // --- Dynamic Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch('php/contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Add comment to the page
                    addComment(data.name, data.message);
                    
                    // Show success message
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 4000); // Hide after 4 seconds
                    }

                    // Reset the form
                    contactForm.reset();
                } else {
                    // Handle server-side error
                    alert(data.message || 'An error occurred.');
                }
            })
            .catch(error => {
                // Handle network error
                console.error('Error:', error);
                alert('A network error occurred. Please try again.');
            });
        });
    }

    function addComment(name, message) {
        const publicComments = document.querySelector('.public-comments');
        if (!publicComments) return;

        const newComment = document.createElement('div');
        newComment.classList.add('comment');

        const commentContent = document.createElement('p');
        commentContent.innerHTML = `<strong>${escapeHTML(name)}:</strong> ${escapeHTML(message)}`;
        
        newComment.appendChild(commentContent);

        // Insert the new comment at the top of the list
        publicComments.insertBefore(newComment, publicComments.children[1]);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"/]/g, function (s) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '/': '&#x2F;'
            }[s];
        });
    }

    // --- Floating Letters Animation ---
    const backgroundAnimation = document.getElementById('background-animation');
    if (backgroundAnimation) {
        const letters = "abcdefghijklmnopqrstuvwxyz" + Array.from({length: 50}, (_, i) => i + 1).join('');
        const numElements = 70;

        // Create an array of unique horizontal positions to avoid collision
        let positions = [];
        for (let i = 0; i < numElements; i++) {
            positions.push((i / numElements) * 100);
        }

        // Shuffle the positions array for randomness
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffle(positions);

        const createLetter = (i) => {
            const letter = document.createElement('span');
            letter.classList.add('letter');
            letter.textContent = letters[Math.floor(Math.random() * letters.length)];
            
            // Assign a unique, shuffled horizontal position
            letter.style.left = `${positions[i]}vw`;

            // Make elements larger
            letter.style.fontSize = `${Math.random() * 30 + 20}px`; // Sizes between 20px and 50px
            
            letter.style.animationDuration = `${Math.random() * 20 + 15}s`; // Duration between 15s and 35s
            letter.style.animationDelay = `${Math.random() * 15}s`; // Increased delay randomness

            backgroundAnimation.appendChild(letter);
        };

        for (let i = 0; i < numElements; i++) {
            createLetter(i);
=======
    // --- Code to display form success message ---
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const successMessage = document.getElementById('form-success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
>>>>>>> b669f641dd6542a4d45d0f48a832e88916b493a0
        }
    }
});
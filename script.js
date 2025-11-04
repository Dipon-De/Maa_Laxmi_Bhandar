document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize AOS (Animate on Scroll)
    // This looks for 'data-aos' attributes in the HTML and animates them.
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true,     // Whether animation should happen only once
        offset: 100,    // Offset (in px) from the original trigger point
    });

    
    // 2. Animated Counters
    // This code makes the numbers in the "Stats" section count up when visible.
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Speed of the counter

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-goal');
                    const count = +counter.innerText;
                    
                    // Calculate increment
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    
    // 3. Image Gallery Lightbox
    // This code makes the gallery images "pop up" when you click them.
    const galleryImages = document.querySelectorAll('#gallery .image-gallery-grid img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            basicLightbox.create(`
                <img src="${img.src}" alt="${img.alt}">
            `).show();
        });
    });

});

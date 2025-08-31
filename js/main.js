// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Initialize Swiper for packages
const packagesSwiper = new Swiper('.packages-swiper', {
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

// Initialize Swiper for premium packages
const premiumPackagesSwiper = new Swiper('.premium-packages-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Initialize Swiper for advantages
const advantagesSwiper = new Swiper('.advantages-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
    }
});

// Initialize Swiper for testimonials
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.md\\:hidden');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form validation logic here
        console.log('Form submitted');
    });
}

// Quick Selection Tabs
const quickTabs = document.querySelectorAll('.quick-tab');
quickTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        quickTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Add your tab switching logic here
    });
});

// Floating Call Button Animation
const callButton = document.querySelector('.floating-call');
if (callButton) {
    callButton.addEventListener('mouseenter', () => {
        callButton.classList.add('animate-float');
    });
    
    callButton.addEventListener('mouseleave', () => {
        callButton.classList.remove('animate-float');
    });
}

// Intersection Observer for Fade-in Elements
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const fadeOnScroll = new IntersectionObserver(function(entries, fadeOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            fadeOnScroll.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeOnScroll.observe(element);
});

// Handle Window Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Add your resize handling logic here
        console.log('Window resized');
    }, 250);
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Add your newsletter subscription logic here
        console.log('Newsletter subscription:', email);
    });
}

// Instagram Gallery Hover Effect
const instagramPosts = document.querySelectorAll('.instagram-post');
instagramPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.querySelector('.overlay').classList.remove('opacity-0');
    });
    
    post.addEventListener('mouseleave', () => {
        post.querySelector('.overlay').classList.add('opacity-0');
    });
}); 
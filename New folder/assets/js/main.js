document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        let currentSlide = 0;
        const slides = [
            { image: 'assets/images/slider/slide1.jpg', title: 'Flash Sale', link: 'flash-sale.php' },
            { image: 'assets/images/slider/slide2.jpg', title: 'New Arrivals', link: 'new-arrivals.php' },
            { image: 'assets/images/slider/slide3.jpg', title: 'Best Deals', link: 'best-deals.php' }
        ];

        function createSlider() {
            slides.forEach((slide, index) => {
                const slideElement = document.createElement('div');
                slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
                slideElement.innerHTML = `
                    <a href="${slide.link}">
                        <img src="${slide.image}" alt="${slide.title}">
                        <div class="slide-content">
                            <h2>${slide.title}</h2>
                        </div>
                    </a>
                `;
                heroSlider.appendChild(slideElement);
            });
        }

        function nextSlide() {
            const slides = document.querySelectorAll('.slide');
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        createSlider();
        setInterval(nextSlide, 5000);
    }

    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.parentNode.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Search Bar Enhancement
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // Add to Cart Animation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                cartCount.classList.add('bounce');
                setTimeout(() => cartCount.classList.remove('bounce'), 300);
            }
        }
    });

    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Product Quick View
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view')) {
            e.preventDefault();
            const productId = e.target.dataset.productId;
            // Implement quick view modal here
            console.log('Quick view for product:', productId);
        }
    });

    // Sticky Header
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}); 
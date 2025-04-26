// Hero Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample slider images (in a real application, these would come from a database)
    const sliderImages = [
        'images/slider/slide1.jpg',
        'images/slider/slide2.jpg',
        'images/slider/slide3.jpg',
        'images/slider/slide4.jpg'
    ];

    let currentSlide = 0;
    const slider = document.querySelector('.slider');

    // Create slider elements
    function createSlider() {
        sliderImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${image})`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
            slider.appendChild(slide);
        });

        // Add navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        sliderImages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        slider.appendChild(dotsContainer);
    }

    // Change slide
    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Auto slide
    function autoSlide() {
        const nextSlide = (currentSlide + 1) % sliderImages.length;
        goToSlide(nextSlide);
    }

    // Initialize slider
    createSlider();
    setInterval(autoSlide, 5000);

    // Flash Sales countdown timer
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        let hours = 2; // Example: 2 hours remaining
        let minutes = 0;
        let seconds = 0;

        setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }

            countdownElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    updateCountdown();

    // Sample product data (in a real application, this would come from a database)
    const products = [
        {
            id: 1,
            title: 'iPhone 13 Pro Max',
            price: 999.99,
            image: 'images/products/iphone.jpg'
        },
        {
            id: 2,
            title: 'Samsung 4K Smart TV',
            price: 799.99,
            image: 'images/products/tv.jpg'
        },
        // Add more products as needed
    ];

    // Render products
    function renderProducts(container, products) {
        const productsGrid = document.querySelector(container);
        productsGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url(${product.image})"></div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Initialize product grids
    renderProducts('.flash-sales .products-grid', products);
    renderProducts('.featured-products .products-grid', products);

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        // In a real application, this would update a cart in the database
        alert('Product added to cart!');
    }
}); 
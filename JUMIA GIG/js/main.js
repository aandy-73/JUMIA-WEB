// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the hero slider
    initHeroSlider();
    
    // Initialize product grid
    initProductGrid();
    
    // Add search functionality
    initSearch();
});

// Hero Slider functionality
function initHeroSlider() {
    const sliderContent = [
        {
            image: 'images/slider1.jpg',
            title: 'Summer Sale',
            description: 'Up to 50% off on selected items'
        },
        {
            image: 'images/slider2.jpg',
            title: 'New Arrivals',
            description: 'Check out our latest products'
        },
        {
            image: 'images/slider3.jpg',
            title: 'Flash Deals',
            description: 'Limited time offers'
        }
    ];

    const heroSlider = document.querySelector('.hero-slider');
    let currentSlide = 0;

    function createSlider() {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url(${sliderContent[currentSlide].image})`;
        
        const content = document.createElement('div');
        content.className = 'slide-content';
        content.innerHTML = `
            <h2>${sliderContent[currentSlide].title}</h2>
            <p>${sliderContent[currentSlide].description}</p>
        `;
        
        slide.appendChild(content);
        heroSlider.innerHTML = '';
        heroSlider.appendChild(slide);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderContent.length;
        createSlider();
    }

    // Initialize first slide
    createSlider();
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Product Grid functionality
function initProductGrid() {
    const products = [
        {
            id: 1,
            name: 'Smartphone X',
            price: 299.99,
            image: 'images/product1.jpg',
            discount: 20
        },
        {
            id: 2,
            name: 'Laptop Pro',
            price: 999.99,
            image: 'images/product2.jpg',
            discount: 15
        },
        // Add more products as needed
    ];

    const productGrid = document.querySelector('.product-grid');
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">
                <span class="original-price">$${product.price}</span>
                <span class="discounted-price">$${(product.price * (1 - product.discount/100)).toFixed(2)}</span>
                <span class="discount-badge">-${product.discount}%</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        return card;
    }

    // Populate product grid
    products.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    // Add to cart functionality
    productGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
}

// Cart functionality
function addToCart(productId) {
    // Get existing cart from localStorage or initialize empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add product to cart
    cart.push(productId);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification('Product added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-link span');
    if (cartCount) {
        cartCount.textContent = `Cart (${cart.length})`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search function
function performSearch(searchTerm) {
    // Redirect to search results page with query parameter
    window.location.href = `search.php?q=${encodeURIComponent(searchTerm)}`;
} 
CREATE DATABASE IF NOT EXISTS jumia_clone;
USE jumia_clone;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    stock INT NOT NULL DEFAULT 0,
    category_id INT,
    image VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_flash_sale BOOLEAN DEFAULT FALSE,
    flash_sale_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Supermarket', 'supermarket', 'Groceries and household items'),
('Health & Beauty', 'health-beauty', 'Health and beauty products'),
('Home & Office', 'home-office', 'Home and office supplies'),
('Appliances', 'appliances', 'Home appliances'),
('Phones & Tablets', 'phones-tablets', 'Mobile phones and tablets'),
('Computing', 'computing', 'Computers and accessories'),
('Electronics', 'electronics', 'Electronic devices'),
('Fashion', 'fashion', 'Clothing and accessories'),
('Baby Products', 'baby-products', 'Baby care products'),
('Gaming', 'gaming', 'Gaming consoles and accessories');

-- Insert sample products
INSERT INTO products (title, slug, description, price, category_id, image, is_featured) VALUES
('iPhone 13 Pro Max', 'iphone-13-pro-max', 'Latest iPhone with amazing features', 999.99, 5, 'images/products/iphone.jpg', 1),
('Samsung 4K Smart TV', 'samsung-4k-smart-tv', '55-inch 4K Smart TV', 799.99, 4, 'images/products/tv.jpg', 1),
('Nike Air Max', 'nike-air-max', 'Comfortable running shoes', 129.99, 8, 'images/products/shoes.jpg', 1),
('Gaming Laptop', 'gaming-laptop', 'High-performance gaming laptop', 1499.99, 6, 'images/products/laptop.jpg', 1);

-- Insert sample flash sale products
INSERT INTO products (title, slug, description, price, sale_price, category_id, image, is_flash_sale, flash_sale_end) VALUES
('Wireless Headphones', 'wireless-headphones', 'Premium wireless headphones', 199.99, 149.99, 7, 'images/products/headphones.jpg', 1, DATE_ADD(NOW(), INTERVAL 2 HOUR)),
('Smart Watch', 'smart-watch', 'Feature-rich smartwatch', 299.99, 199.99, 7, 'images/products/watch.jpg', 1, DATE_ADD(NOW(), INTERVAL 2 HOUR)); 
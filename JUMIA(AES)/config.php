<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'jumia_clone');

// Create database connection
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASS
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Function to get all products
function getAllProducts() {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to get products by category
function getProductsByCategory($category) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products WHERE category = ?");
    $stmt->execute([$category]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to get flash sale products
function getFlashSaleProducts() {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products WHERE is_flash_sale = 1");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to get featured products
function getFeaturedProducts() {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products WHERE is_featured = 1");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to search products
function searchProducts($query) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products WHERE title LIKE ? OR description LIKE ?");
    $searchTerm = "%$query%";
    $stmt->execute([$searchTerm, $searchTerm]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to add product to cart
function addToCart($userId, $productId, $quantity = 1) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
    return $stmt->execute([$userId, $productId, $quantity]);
}

// Function to get cart items
function getCartItems($userId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("
        SELECT c.*, p.title, p.price, p.image 
        FROM cart c 
        JOIN products p ON c.product_id = p.id 
        WHERE c.user_id = ?
    ");
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to update cart quantity
function updateCartQuantity($userId, $productId, $quantity) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
    return $stmt->execute([$quantity, $userId, $productId]);
}

// Function to remove item from cart
function removeFromCart($userId, $productId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
    return $stmt->execute([$userId, $productId]);
}

// Function to get user by email
function getUserByEmail($email) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Function to create new user
function createUser($name, $email, $password) {
    $conn = getDBConnection();
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    return $stmt->execute([$name, $email, $hashedPassword]);
}

// Function to verify user login
function verifyLogin($email, $password) {
    $user = getUserByEmail($email);
    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }
    return false;
}
?> 
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

// Session management
session_start();

// User authentication functions
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit();
    }
}

// Cart management functions
function getCartItems() {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    return $_SESSION['cart'];
}

function addToCart($productId, $quantity = 1) {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    if (isset($_SESSION['cart'][$productId])) {
        $_SESSION['cart'][$productId] += $quantity;
    } else {
        $_SESSION['cart'][$productId] = $quantity;
    }
}

function removeFromCart($productId) {
    if (isset($_SESSION['cart'][$productId])) {
        unset($_SESSION['cart'][$productId]);
    }
}

function getCartTotal() {
    $total = 0;
    $conn = getDBConnection();
    
    foreach ($_SESSION['cart'] as $productId => $quantity) {
        $stmt = $conn->prepare("SELECT price FROM products WHERE id = ?");
        $stmt->execute([$productId]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            $total += $product['price'] * $quantity;
        }
    }
    
    return $total;
}

// Product management functions
function getProducts($limit = 12, $offset = 0, $category = null) {
    $conn = getDBConnection();
    $params = [];
    $sql = "SELECT * FROM products";
    
    if ($category) {
        $sql .= " WHERE category = ?";
        $params[] = $category;
    }
    
    $sql .= " LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getProductById($id) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Search functionality
function searchProducts($query, $limit = 12) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("
        SELECT * FROM products 
        WHERE name LIKE ? OR description LIKE ?
        LIMIT ?
    ");
    $searchTerm = "%{$query}%";
    $stmt->execute([$searchTerm, $searchTerm, $limit]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Helper functions
function formatPrice($price) {
    return number_format($price, 2);
}

function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Error handling
function setError($message) {
    $_SESSION['error'] = $message;
}

function getError() {
    $error = $_SESSION['error'] ?? null;
    unset($_SESSION['error']);
    return $error;
}

function setSuccess($message) {
    $_SESSION['success'] = $message;
}

function getSuccess() {
    $success = $_SESSION['success'] ?? null;
    unset($_SESSION['success']);
    return $success;
} 
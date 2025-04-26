# Jumia Clone

A responsive e-commerce website clone of Jumia, built with PHP, MySQL, HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- User authentication (login/register)
- Product catalog with categories
- Shopping cart functionality
- Order management
- Product search
- User reviews and ratings
- Admin dashboard for managing products and orders

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jumia-clone.git
cd jumia-clone
```

2. Create a MySQL database and import the database structure:
```bash
mysql -u root -p
CREATE DATABASE jumia_clone;
exit;
mysql -u root -p jumia_clone < database.sql
```

3. Configure the database connection:
- Open `config/database.php`
- Update the database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'jumia_clone');
```

4. Set up your web server:
- Point your web server's document root to the project directory
- Ensure the web server has write permissions for the uploads directory

5. Access the website:
- Open your web browser
- Navigate to `http://localhost/jumia-clone`

## Directory Structure

```
jumia-clone/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
├── includes/
├── uploads/
├── index.php
├── login.php
├── register.php
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Jumia for inspiration
- Font Awesome for icons
- All contributors who have helped with the project 
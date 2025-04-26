# Jumia Clone E-commerce Website

A responsive e-commerce website inspired by Jumia, built with HTML, CSS, PHP, and JavaScript.

## Features

- Responsive design that works on all devices
- User authentication (login/register)
- Product catalog with categories
- Shopping cart functionality
- Search functionality
- Order management
- Admin panel for product management

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

2. Create a MySQL database and import the schema:
```bash
mysql -u root -p < database.sql
```

3. Configure the database connection:
   - Open `config.php`
   - Update the database credentials:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'your_username');
     define('DB_PASS', 'your_password');
     define('DB_NAME', 'jumia_clone');
     ```

4. Set up your web server:
   - Point your web server's document root to the project directory
   - Ensure PHP has write permissions for the uploads directory

5. Access the website:
   - Open your web browser
   - Navigate to `http://localhost/jumia-clone`

## Directory Structure

```
jumia-clone/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── products/
│   └── slider/
├── config.php
├── database.sql
├── index.php
├── login.php
├── register.php
├── cart.php
├── product.php
├── category.php
├── search.php
└── README.md
```

## Features in Detail

### User Features
- User registration and login
- Profile management
- Order history
- Shopping cart
- Wishlist
- Product reviews and ratings

### Product Features
- Product categories
- Product search
- Product filtering
- Product details
- Related products
- Flash sales

### Admin Features
- Product management
- Category management
- Order management
- User management
- Sales reports

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
- All contributors who help improve this project

## Support

For support, email support@jumia-clone.com or create an issue in the repository. 
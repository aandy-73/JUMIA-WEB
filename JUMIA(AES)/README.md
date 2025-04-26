# Jumia Clone E-commerce Website

A modern e-commerce website inspired by Jumia, built with HTML, CSS, PHP, and JavaScript.

## Features

- Responsive design
- Product catalog with categories
- Flash sales with countdown timer
- Shopping cart functionality
- User authentication
- Product search
- Order management
- Admin dashboard (coming soon)

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
mysql -u root -p < database.sql
```

3. Configure the database connection:
   - Open `includes/config.php`
   - Update the database credentials (DB_HOST, DB_USER, DB_PASS, DB_NAME)

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
│   └── script.js
├── images/
│   ├── products/
│   └── slider/
├── includes/
│   └── config.php
├── index.php
├── database.sql
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Jumia for inspiration

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/jumia-clone 
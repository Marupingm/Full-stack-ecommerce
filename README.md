# Full-Stack E-commerce Platform

A modern, feature-rich e-commerce solution built with Next.js, MongoDB, and Tailwind CSS. This platform offers a seamless shopping experience with product browsing, cart management, secure checkout, and more.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Contact](#contact)

## Features

- **Product Catalog**: Browse products by categories (Men, Women, Teens)
- **User-Friendly Interface**: Responsive design that works on all devices
- **Shopping Cart**: Add, remove, and update items with the use-shopping-cart library
- **Checkout Process**: Streamlined payment flow
- **Order Management**: View order history and status
- **Search Functionality**: Find products quickly
- **Product Details**: View detailed information, multiple images, and available sizes
- **Success/Cancel Pages**: Handle payment outcomes gracefully

## Folder Structure

```
Full-Stack E-commerce/
├── app/                   # Next.js 14 app directory
│   ├── api/               # API routes for server-side functionality
│   ├── components/        # App-specific components
│   ├── [category]/        # Dynamic routes for product categories
│   ├── product/           # Product detail pages
│   ├── shipping/          # Checkout and shipping pages
│   ├── success/           # Payment success page
│   └── cancel/            # Payment cancellation page
├── components/            # Shared React components
│   └── ui/                # UI components (buttons, cards, etc.)
├── lib/                   # Utility functions and shared logic
│   ├── mongodb.ts         # MongoDB connection and utilities
│   └── utils.ts           # Helper functions
├── models/                # Mongoose data models
│   ├── Product.ts         # Product schema and model
│   └── Order.js           # Order schema and model
├── public/                # Static assets
└── scripts/               # Utility scripts for setup and maintenance
```

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Marupingm/full-stack-ecommerce.git
   cd full-stack-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Initialize the database:**
   ```bash
   npm run seed
   ```

5. **Set up product images:**
   ```bash
   npm run setup-images
   ```

## Usage

1. **Development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

### Example: Adding Products to Cart

```javascript
// Import the useShoppingCart hook
import { useShoppingCart } from 'use-shopping-cart';

// Use in your component
const { addItem } = useShoppingCart();

// Add item to cart
addItem({
  id: product._id,
  name: product.name,
  price: product.price,
  currency: 'USD',
  image: product.images[0]
});
```

## Technologies Used

- **Frontend**:
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - use-shopping-cart (for cart functionality)
  - Lucide React (for icons)
  - Sonner (for toast notifications)

- **Backend**:
  - Next.js API Routes
  - MongoDB/Mongoose
  - Stripe (payment processing)

- **Development Tools**:
  - ESLint
  - TypeScript
  - Vercel (deployment)

## Contribution Guidelines

We welcome contributions to improve the e-commerce platform. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Lead - Maruping


---

Made with ❤️ using Next.js, MongoDB, and Tailwind CSS
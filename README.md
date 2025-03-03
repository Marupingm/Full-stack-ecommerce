# Nike E-commerce Store

A modern, full-stack e-commerce application built with Next.js 14, featuring a sleek UI for browsing Nike products, shopping cart functionality, and secure payment processing.

## Features

- 🛍️ Browse products by category (Men, Women, Teens)
- 🔍 View detailed product information with image galleries
- 🛒 Shopping cart functionality with real-time updates
- 💳 Secure payment processing with PayFast integration
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔒 MongoDB database integration
- 🚀 Server-side rendering for optimal performance

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - Sonner (Toast notifications)
  - use-shopping-cart

- **Backend:**
  - Next.js API Routes
  - MongoDB with Mongoose
  - PayFast Payment Integration

- **Development Tools:**
  - TypeScript
  - ESLint
  - Prettier
  - PostCSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=your_payfast_merchant_id
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=your_payfast_merchant_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Full-stack-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── components/     # Reusable React components
│   ├── models/        # MongoDB models
│   ├── lib/           # Utility functions and configurations
│   ├── [category]/    # Dynamic category pages
│   ├── product/       # Product detail pages
│   └── api/          # API routes
├── public/           # Static assets
├── scripts/         # Database seeding scripts
└── styles/         # Global styles and Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with sample products

## Database

The application uses MongoDB with Mongoose for data management. The database includes collections for:
- Products (with categories, sizes, images, and pricing)
- Orders (future implementation)
- Users (future implementation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Nike product images from Unsplash
- UI components inspired by modern e-commerce best practices
- Built with love using Next.js and React

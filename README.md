# TopsyCommerce - Next.js E-Commerce Platform

A modern e-commerce platform built with Next.js, MongoDB, and PayFast integration. Features a responsive design, shopping cart functionality, and secure payment processing.

## Features

- 🛍️ Product catalog with category filtering
- 🛒 Shopping cart functionality
- 💳 Secure PayFast payment integration
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔍 Product search and filtering
- 🏷️ Category-based navigation
- 🔒 Secure payment processing
- 📦 MongoDB integration for product management

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - Tailwind CSS
  - Lucide Icons
  - TypeScript

- **Backend:**
  - MongoDB
  - Mongoose
  - Next.js API Routes

- **Payment Processing:**
  - PayFast Integration

- **State Management:**
  - use-shopping-cart

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- PayFast merchant account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-topsycommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=your_payfast_merchant_id
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=your_payfast_merchant_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

1. Create a MongoDB Atlas cluster
2. Add your IP address to the IP Access List
3. Create a database user
4. Get your connection string and add it to the `.env` file

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy!

## Project Structure

```
nextjs-topsycommerce/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── [category]/        # Dynamic category pages
├── lib/                   # Utility functions
├── models/               # MongoDB models
└── public/               # Static assets
```

## Features in Detail

### Shopping Cart
- Add/remove items
- Adjust quantities
- Persistent cart state
- Real-time price updates

### Payment Processing
- Secure PayFast integration
- Order confirmation
- Success/Cancel pages
- Payment notifications

### Product Management
- MongoDB integration
- Category organization
- Image management
- Stock tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- PayFast for payment processing
- MongoDB for database services

```bash
npm i stripe use-shopping-cart next-sanity @stripe/stripe-js @sanity/image-url --force
```

## Hero Images:
https://github.com/ski043/nextjs-commerce-tutorial/tree/main/public/HeroImages

## Products:

#Product One:
Nike Air VaporMax 2023 Flyknit

Price: 200

Category: Men

description:
Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style. Its innovative Flyknit upper offers a second-skin fit, ensuring a snug yet breathable feel with every step. The renowned VaporMax sole unit delivers unparalleled cushioning and responsiveness, providing a smooth ride that's perfect for both athletic performance and street-style fashion.

images: https://github.com/ski043/nextjs-commerce-tutorial/tree/main/public/ProductOne


#Product Two:
Nike Sportswear Phoenix Fleece

Price: 35

Category: Women

Description:
Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe. Its soft and cozy fleece fabric offers a perfect balance of comfort and durability, making it ideal for cool days and relaxed outings. With a modern, sporty design and the iconic Nike Swoosh, this fleece adds a touch of urban flair to your look. Whether you're hitting the gym or hanging out with friends, the Nike Sportswear Phoenix Fleece keeps you both cozy and stylish. Elevate your everyday wear with this classic piece of Nike Sportswear.

images: https://github.com/ski043/nextjs-commerce-tutorial/tree/main/public/ProductTwo

#Product Three:
Nike Air Force 1 '07

Price: 85

Category: Teens

Description:
The Nike Air Force 1 '07 represents a legend in the world of sneakers. With a design that transcends generations, this classic silhouette has remained a symbol of street-style culture for over three decades. Its white leather upper and clean lines are a canvas for self-expression, allowing you to pair it with any outfit, from casual to chic.

Images: https://github.com/ski043/nextjs-commerce-tutorial/tree/main/public/ProductThree

#Product Four
Nike Windrunner

Price: 200

Category: Men

Description:
The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance. With a design that has stood the test of time, this lightweight and versatile outerwear piece is your go-to choice for brisk mornings, breezy afternoons, and everything in between. Its distinctive chevron design on the chest pays homage to its heritage, while the modern materials and construction ensure it's ready for the demands of today.

Images: https://github.com/ski043/nextjs-commerce-tutorial/tree/main/public/ProductFour

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

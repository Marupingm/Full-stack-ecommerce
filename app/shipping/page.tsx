'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'sonner';
import Image from 'next/image';
import LoadingSpinner from '@/app/components/ui/loading-spinner';
import { CheckCircle2, Circle } from 'lucide-react';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function ShippingPage() {
  const router = useRouter();
  const { cartDetails, totalPrice, cartCount } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: ''
  });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!shippingDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!shippingDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!shippingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!shippingDetails.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!shippingDetails.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{4}$/.test(shippingDetails.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 4-digit postal code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please check the form for errors', {
        className: 'bg-white border border-red-100',
        descriptionClassName: 'text-gray-600',
        style: { color: '#EF4444' }
      });
      return;
    }

    setIsLoading(true);

    try {
      sessionStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartDetails,
          shippingDetails,
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error processing checkout', {
        className: 'bg-white border border-red-100',
        descriptionClassName: 'text-gray-600',
        style: { color: '#EF4444' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format price helper function
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100);
  };

  if (!cartDetails || Object.keys(cartDetails).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = totalPrice || 0;
  const tax = subtotal * 0.15; // 15% tax
  const shipping = 10000; // R100.00 flat rate
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <span className="ml-2 text-sm font-medium">Cart</span>
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center">
              <div className="rounded-full bg-blue-600 p-1">
                <Circle className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Shipping</span>
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center text-gray-400">
              <Circle className="h-6 w-6" />
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Details Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 border border-gray-200 rounded-lg">
              <h1 className="text-2xl font-bold mb-6">Billing Details</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {Object.values(cartDetails ?? {}).map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image as string}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">{formatPrice(subtotal)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Tax (15%)</p>
                  <p className="font-medium">{formatPrice(tax)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">{formatPrice(shipping)}</p>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t">
                  <p>Total</p>
                  <p>{formatPrice(total)}</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full mt-6 bg-[#0f172a] text-white py-3 rounded-md font-medium flex items-center justify-center
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e293b]'}`}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  'Proceed to PayFast'
                )}
              </button>

              {/* Back to Cart Link */}
              <button
                onClick={() => router.back()}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
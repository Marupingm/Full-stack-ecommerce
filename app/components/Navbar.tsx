"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick, cartCount = 0 } = useShoppingCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b transition-all duration-300">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl h-16 lg:h-20">
        {/* Logo - Visible on both mobile and desktop */}
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingCart className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Top<span className="text-blue-600">sy</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-blue-600 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600 after:transition-all"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition-all duration-300 hover:text-blue-600 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Cart and Mobile Menu Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="relative flex items-center justify-center h-12 w-12 rounded-full border hover:bg-blue-50 transition-all duration-300"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button - Only visible on mobile */}
          <Button
            variant={"outline"}
            className="lg:hidden h-12 w-12 rounded-full border hover:bg-blue-50 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Only rendered on mobile and when menu is open */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-lg font-semibold p-2 rounded-lg transition-all duration-300 ${
                  pathname === link.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
// Modified on 2025-02-19 00:50:46
// Modified on 2025-02-19 00:52:35

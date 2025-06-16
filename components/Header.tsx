"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChefHat, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/AuthForm";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-beige-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-teal-500" />
              <span className="text-2xl font-bold text-gray-800">KitchenBuddy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-teal-500 transition-colors">
                Beranda
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-teal-500 transition-colors">
                Cari Resep
              </Link>
              <Link href="/recipes" className="text-gray-700 hover:text-teal-500 transition-colors">
                Semua Resep
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-teal-500 transition-colors">
                Tentang
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-teal-500 text-teal-500 hover:bg-teal-50" onClick={() => setShowAuthModal(true)}>
                <User className="h-4 w-4 mr-2" />
                Masuk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-beige-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-gray-700 hover:text-teal-500 transition-colors">
                  Beranda
                </Link>
                <Link href="/search" className="text-gray-700 hover:text-teal-500 transition-colors">
                  Cari Resep
                </Link>
                <Link href="/recipes" className="text-gray-700 hover:text-teal-500 transition-colors">
                  Semua Resep
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-teal-500 transition-colors">
                  Tentang
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-beige-200">
                  <Button variant="outline" size="sm" className="justify-start border-teal-500 text-teal-500 hover:bg-teal-50" onClick={() => setShowAuthModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Masuk
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Masuk / Daftar ke RecipeAI</h2>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <AuthForm onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

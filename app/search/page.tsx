'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchInterface from '@/components/SearchInterface';
import RecipeResults from '@/components/RecipeResults';
import Footer from '@/components/Footer';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (ingredients: string) => {
    setIsLoading(true);
    // TODO: Integrate with AI backend
    // For now, mock some results
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          title: 'Ayam Tomat Segar',
          description: 'Hidangan ayam dengan tomat segar yang lezat dan bergizi',
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
          cookTime: '30 menit',
          difficulty: 'Mudah',
          ingredients: ['Ayam', 'Tomat', 'Bawang', 'Minyak'],
          rating: 4.5
        },
        {
          id: 2,
          title: 'Tumis Ayam Tomat',
          description: 'Tumisan ayam dengan tomat yang pedas dan menggugah selera',
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
          cookTime: '25 menit',
          difficulty: 'Mudah',
          ingredients: ['Ayam', 'Tomat', 'Cabai', 'Bawang putih'],
          rating: 4.3
        },
        {
          id: 3,
          title: 'Sup Ayam Tomat',
          description: 'Sup hangat dengan ayam dan tomat yang menyegarkan',
          image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
          cookTime: '45 menit',
          difficulty: 'Sedang',
          ingredients: ['Ayam', 'Tomat', 'Wortel', 'Seledri'],
          rating: 4.7
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
        <RecipeResults results={searchResults} isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}
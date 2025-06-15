'use client';

import { useState } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchInterfaceProps {
  onSearch: (ingredients: string) => void;
  isLoading: boolean;
}

const suggestionIngredients = [
  'Ayam', 'Tomat', 'Bawang', 'Cabai', 'Daging Sapi', 'Telur', 
  'Nasi', 'Kentang', 'Wortel', 'Brokoli', 'Tahu', 'Tempe'
];

const quickSearches = [
  'Saya punya ayam dan tomat',
  'Ada daging sapi, bawang, dan cabai',
  'Punya telur, nasi, dan sayuran',
  'Ada tahu, tempe, dan bumbu dapur'
];

export default function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-beige-200 rounded-full text-teal-700 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2 text-teal-500" />
              Powered by AI
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cari Resep dengan AI
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ceritakan bahan yang kamu punya dalam bahasa natural, biarkan AI menemukan resep terbaik untukmu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Contoh: Saya punya ayam, tomat, bawang putih, dan cabai. Mau masak apa ya?"
                className="w-full p-6 pr-16 border-2 border-beige-200 rounded-2xl focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-200 resize-none text-lg placeholder:text-gray-400"
                rows={4}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!searchQuery.trim() || isLoading}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
          </form>

          {/* Quick Search Suggestions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Coba cari cepat:</h3>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(search)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-beige-100 hover:bg-teal-100 hover:text-teal-700 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient Suggestions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Bahan populer:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestionIngredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors bg-beige-100 text-teal-600"
                  onClick={() => setSearchQuery(prev => 
                    prev ? `${prev}, ${ingredient}` : `Saya punya ${ingredient}`
                  )}
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Star, ChefHat, Users, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const allRecipes = [
  {
    id: 1,
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar yang menggugah selera',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    cookTime: '25 menit',
    difficulty: 'Mudah',
    rating: 4.8,
    servings: '2-3 porsi',
    ingredients: ['Nasi', 'Telur', 'Ayam', 'Kecap', 'Bawang', 'Cabai']
  },
  {
    id: 2,
    title: 'Rendang Daging Sapi',
    description: 'Rendang autentik dengan bumbu rempah tradisional yang kaya rasa',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    cookTime: '2 jam',
    difficulty: 'Sulit',
    rating: 4.9,
    servings: '4-6 porsi',
    ingredients: ['Daging Sapi', 'Santan', 'Cabai', 'Serai', 'Lengkuas', 'Daun Jeruk']
  },
  {
    id: 3,
    title: 'Soto Ayam Jakarta',
    description: 'Soto ayam kuah bening dengan rempah khas Jakarta yang hangat',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    cookTime: '45 menit',
    difficulty: 'Sedang',
    rating: 4.7,
    servings: '3-4 porsi',
    ingredients: ['Ayam', 'Kunyit', 'Bawang', 'Kentang', 'Tomat', 'Seledri']
  },
  {
    id: 4,
    title: 'Gado-Gado Jakarta',
    description: 'Salad sayuran dengan bumbu kacang yang gurih dan segar',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    cookTime: '20 menit',
    difficulty: 'Mudah',
    rating: 4.6,
    servings: '2-3 porsi',
    ingredients: ['Tahu', 'Tempe', 'Kacang', 'Sayuran', 'Lontong', 'Kerupuk']
  },
  {
    id: 5,
    title: 'Ayam Bakar Kecap',
    description: 'Ayam bakar dengan bumbu kecap manis yang lezat dan gurih',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    cookTime: '40 menit',
    difficulty: 'Sedang',
    rating: 4.5,
    servings: '3-4 porsi',
    ingredients: ['Ayam', 'Kecap Manis', 'Bawang', 'Jahe', 'Cabai', 'Jeruk Nipis']
  },
  {
    id: 6,
    title: 'Mie Ayam Bakso',
    description: 'Mie ayam dengan bakso dan pangsit yang kenyal dan lezat',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    cookTime: '35 menit',
    difficulty: 'Sedang',
    rating: 4.4,
    servings: '2-3 porsi',
    ingredients: ['Mie', 'Ayam', 'Bakso', 'Pangsit', 'Sawi', 'Bawang Goreng']
  },
  {
    id: 7,
    title: 'Gudeg Yogya',
    description: 'Gudeg khas Yogyakarta dengan nangka muda yang manis dan gurih',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    cookTime: '3 jam',
    difficulty: 'Sulit',
    rating: 4.8,
    servings: '4-6 porsi',
    ingredients: ['Nangka Muda', 'Santan', 'Gula Jawa', 'Daun Salam', 'Lengkuas', 'Telur']
  },
  {
    id: 8,
    title: 'Pecel Lele',
    description: 'Lele goreng crispy dengan sambal pecel yang pedas dan segar',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    cookTime: '30 menit',
    difficulty: 'Mudah',
    rating: 4.3,
    servings: '2-3 porsi',
    ingredients: ['Lele', 'Cabai', 'Tomat', 'Terasi', 'Gula Merah', 'Lalapan']
  },
  {
    id: 9,
    title: 'Rawon Surabaya',
    description: 'Rawon khas Surabaya dengan kuah hitam yang kaya rempah',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    cookTime: '2.5 jam',
    difficulty: 'Sulit',
    rating: 4.7,
    servings: '4-5 porsi',
    ingredients: ['Daging Sapi', 'Kluwek', 'Lengkuas', 'Serai', 'Daun Jeruk', 'Tauge']
  },
  {
    id: 10,
    title: 'Bakso Malang',
    description: 'Bakso khas Malang dengan berbagai isian dan kuah yang gurih',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    cookTime: '1 jam',
    difficulty: 'Sedang',
    rating: 4.6,
    servings: '3-4 porsi',
    ingredients: ['Daging Sapi', 'Tepung Tapioka', 'Mie', 'Tahu', 'Siomay', 'Pangsit']
  },
  {
    id: 11,
    title: 'Sate Ayam Madura',
    description: 'Sate ayam khas Madura dengan bumbu kacang yang kental dan gurih',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    cookTime: '45 menit',
    difficulty: 'Sedang',
    rating: 4.5,
    servings: '2-3 porsi',
    ingredients: ['Ayam', 'Kacang Tanah', 'Kecap Manis', 'Cabai', 'Bawang', 'Ketupat']
  },
  {
    id: 12,
    title: 'Opor Ayam',
    description: 'Opor ayam dengan kuah santan yang creamy dan bumbu yang harum',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    cookTime: '50 menit',
    difficulty: 'Sedang',
    rating: 4.4,
    servings: '4-5 porsi',
    ingredients: ['Ayam', 'Santan', 'Kemiri', 'Ketumbar', 'Jinten', 'Daun Salam']
  }
];

export default function RecipesPage() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<number[]>([]);

  const toggleBookmark = (recipeId: number) => {
    setBookmarkedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Semua Resep
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jelajahi koleksi lengkap resep masakan Indonesia yang lezat dan mudah dibuat
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allRecipes.map((recipe) => (
            <Card key={recipe.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/recipe/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(recipe.id);
                    }}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${bookmarkedRecipes.includes(recipe.id) ? 'fill-teal-500 text-teal-500' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <Link href={`/recipe/${recipe.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {recipe.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cookTime}
                  </div>
                  <div className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1" />
                    {recipe.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-beige-100 text-teal-700">
                      {ingredient}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-beige-100 text-teal-700">
                      +{recipe.ingredients.length - 3} lagi
                    </Badge>
                  )}
                </div>
                
                <Link href={`/recipe/${recipe.id}`}>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                    Lihat Resep Lengkap
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
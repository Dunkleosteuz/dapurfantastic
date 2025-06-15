'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Star, ChefHat, Users, Bookmark, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recipeData: { [key: string]: any } = {
  '1': {
    id: 1,
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar yang menggugah selera',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    cookTime: '25 menit',
    prepTime: '15 menit',
    difficulty: 'Mudah',
    rating: 4.8,
    servings: '2-3 porsi',
    ingredients: [
      '3 piring nasi putih (dingin)',
      '2 butir telur',
      '200g daging ayam, potong dadu',
      '3 sdm kecap manis',
      '2 siung bawang putih, cincang',
      '1 buah bawang bombay, iris',
      '2 buah cabai merah, iris',
      '1 batang daun bawang, iris',
      '2 sdm minyak goreng',
      'Garam dan merica secukupnya'
    ],
    equipment: [
      'Wajan atau penggorengan besar',
      'Spatula kayu',
      'Pisau',
      'Talenan',
      'Mangkuk',
      'Sendok'
    ],
    instructions: [
      'Panaskan minyak dalam wajan dengan api sedang',
      'Masukkan bawang putih dan bawang bombay, tumis hingga harum',
      'Tambahkan ayam, masak hingga berubah warna',
      'Kocok telur, tuang ke dalam wajan dan aduk rata',
      'Masukkan nasi, aduk hingga tercampur rata',
      'Tambahkan kecap manis, garam, dan merica',
      'Masukkan cabai dan daun bawang, aduk sebentar',
      'Angkat dan sajikan selagi hangat'
    ]
  },
  '2': {
    id: 2,
    title: 'Rendang Daging Sapi',
    description: 'Rendang autentik dengan bumbu rempah tradisional yang kaya rasa',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    cookTime: '2 jam',
    prepTime: '30 menit',
    difficulty: 'Sulit',
    rating: 4.9,
    servings: '4-6 porsi',
    ingredients: [
      '1 kg daging sapi, potong kotak',
      '1 liter santan kental',
      '10 buah cabai merah keriting',
      '5 buah cabai merah besar',
      '8 siung bawang merah',
      '6 siung bawang putih',
      '3 cm jahe',
      '4 cm lengkuas',
      '3 batang serai',
      '5 lembar daun jeruk',
      '2 sdm gula merah',
      'Garam secukupnya'
    ],
    equipment: [
      'Wajan besar atau kuali',
      'Blender atau cobek',
      'Pisau',
      'Talenan',
      'Sendok kayu',
      'Saringan santan'
    ],
    instructions: [
      'Haluskan cabai, bawang merah, bawang putih, jahe, dan lengkuas',
      'Tumis bumbu halus hingga harum dan matang',
      'Masukkan daging sapi, aduk hingga berubah warna',
      'Tuang santan, tambahkan serai dan daun jeruk',
      'Masak dengan api kecil sambil terus diaduk',
      'Tambahkan gula merah dan garam',
      'Masak hingga kuah mengental dan daging empuk (sekitar 2 jam)',
      'Aduk sesekali agar tidak gosong',
      'Angkat dan sajikan dengan nasi putih'
    ]
  }
};

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;
  const recipe = recipeData[recipeId];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resep tidak ditemukan</h1>
          <Link href="/recipes">
            <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
              Kembali ke Semua Resep
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/recipes" className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Semua Resep
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Image and Basic Info */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white mb-8">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${isBookmarked ? 'fill-teal-500 text-teal-500' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {recipe.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Clock className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Waktu Masak</p>
                    <p className="font-semibold">{recipe.cookTime}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <ChefHat className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tingkat</p>
                    <p className="font-semibold">{recipe.difficulty}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Users className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Porsi</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Clock className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Persiapan</p>
                    <p className="font-semibold">{recipe.prepTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cara Membuat</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((step: string, index: number) => (
                    <div 
                      key={index} 
                      className={`flex items-start space-x-4 p-4 rounded-lg transition-all cursor-pointer ${
                        completedSteps.includes(index) 
                          ? 'bg-teal-50 border-2 border-teal-200' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleStep(index)}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        completedSteps.includes(index)
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {completedSteps.includes(index) ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <p className={`text-gray-700 ${completedSteps.includes(index) ? 'line-through' : ''}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bahan-bahan</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Peralatan</h3>
                <ul className="space-y-2">
                  {recipe.equipment.map((item: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-beige-400 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {isBookmarked ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
              </Button>
              <Button variant="outline" className="w-full border-teal-500 text-teal-500 hover:bg-teal-50">
                Bagikan Resep
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
import Link from 'next/link';
import { Clock, Star, ChefHat, Users, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const featuredRecipes = [
  {
    id: 1,
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    cookTime: '25 menit',
    difficulty: 'Mudah',
    rating: 4.8,
    servings: '2-3 porsi',
    ingredients: ['Nasi', 'Telur', 'Ayam', 'Kecap']
  },
  {
    id: 2,
    title: 'Rendang Daging Sapi',
    description: 'Rendang autentik dengan bumbu rempah tradisional',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    cookTime: '2 jam',
    difficulty: 'Sulit',
    rating: 4.9,
    servings: '4-6 porsi',
    ingredients: ['Daging Sapi', 'Santan', 'Cabai', 'Serai']
  },
  {
    id: 3,
    title: 'Soto Ayam Jakarta',
    description: 'Soto ayam kuah bening dengan rempah khas Jakarta',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    cookTime: '45 menit',
    difficulty: 'Sedang',
    rating: 4.7,
    servings: '3-4 porsi',
    ingredients: ['Ayam', 'Kunyit', 'Bawang', 'Kentang']
  },
  {
    id: 4,
    title: 'Gado-Gado Jakarta',
    description: 'Salad sayuran dengan bumbu kacang yang gurih',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    cookTime: '20 menit',
    difficulty: 'Mudah',
    rating: 4.6,
    servings: '2-3 porsi',
    ingredients: ['Tahu', 'Tempe', 'Kacang', 'Sayuran']
  }
];

export default function FeaturedRecipes() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Resep Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan resep-resep terbaik yang paling disukai pengguna kami
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe) => (
            <Card key={recipe.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/recipe/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Bookmark className="h-4 w-4" />
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
                
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-beige-100 text-teal-700">
                      {ingredient}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-beige-100 text-teal-700">
                      +{recipe.ingredients.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
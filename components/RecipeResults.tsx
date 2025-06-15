import Link from 'next/link';
import { Clock, Star, ChefHat, Users, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: string;
  rating: number;
  ingredients: string[];
}

interface RecipeResultsProps {
  results: Recipe[];
  isLoading: boolean;
}

export default function RecipeResults({ results, isLoading }: RecipeResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium">
            <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            AI sedang mencari resep terbaik untuk kamu...
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-lg">
              <div className="h-48 bg-beige-200 animate-pulse rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-beige-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-beige-200 animate-pulse rounded mb-4"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 w-16 bg-beige-200 animate-pulse rounded"></div>
                  <div className="h-4 w-16 bg-beige-200 animate-pulse rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-beige-200 animate-pulse rounded-full"></div>
                  <div className="h-6 w-16 bg-beige-200 animate-pulse rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Resep yang Ditemukan
        </h2>
        <p className="text-gray-600">
          Kami menemukan {results.length} resep yang cocok dengan bahan kamu
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((recipe) => (
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
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <Link href={`/recipe/${recipe.id}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
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
                  2-4 porsi
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
  );
}
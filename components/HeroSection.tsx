import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-beige-400/20 backdrop-blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Didukung Teknologi AI Terdepan
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Temukan Resep
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
              {' '}Sempurna
            </span>
            <br />
            dari Bahan yang Ada
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cukup sebutkan bahan yang kamu punya, dan biarkan AI kami menemukan resep terbaik 
            untukmu. Masak jadi lebih mudah dan menyenangkan!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/search">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Search className="h-5 w-5 mr-2" />
                Mulai Cari Resep
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cari dengan AI</h3>
              <p className="text-gray-600">Ketik bahan dalam bahasa natural, AI akan memahami</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-beige-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rekomendasi Cerdas</h3>
              <p className="text-gray-600">Dapatkan resep yang cocok dengan preferensi kamu</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">∞</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Resep Tak Terbatas</h3>
              <p className="text-gray-600">Akses ribuan resep dari berbagai daerah</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
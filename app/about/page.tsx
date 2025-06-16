import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChefHat, Users, Target, Heart, Award, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Tentang KitchenBuddy
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolusi Cara Kamu
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
              {' '}Memasak
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            KitchenBuddy adalah platform inovatif yang menggunakan kecerdasan buatan untuk membantu
            kamu menemukan resep masakan terbaik berdasarkan bahan yang tersedia di rumah.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-teal-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Membuat memasak menjadi lebih mudah, menyenangkan, dan efisien dengan 
                memanfaatkan teknologi AI terdepan. Kami percaya bahwa setiap orang 
                berhak mendapatkan akses ke resep-resep lezat tanpa perlu khawatir 
                tentang ketersediaan bahan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-beige-200 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform kuliner AI terdepan di Indonesia yang menginspirasi 
                jutaan orang untuk menciptakan hidangan lezat dari bahan-bahan sederhana 
                yang ada di sekitar mereka, sambil melestarikan kekayaan kuliner nusantara.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih KitchenBuddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknologi canggih yang dirancang khusus untuk pengalaman memasak yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="h-8 w-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Cerdas</h3>
                <p className="text-gray-600">
                  Teknologi Natural Language Processing yang memahami bahasa natural 
                  dan memberikan rekomendasi resep yang akurat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-beige-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Komunitas</h3>
                <p className="text-gray-600">
                  Bergabung dengan ribuan pengguna yang saling berbagi resep, tips, 
                  dan pengalaman memasak yang menginspirasi.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kualitas Terjamin</h3>
                <p className="text-gray-600">
                  Setiap resep telah diuji dan diverifikasi oleh chef profesional 
                  untuk memastikan hasil masakan yang sempurna.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              KitchenBuddy dalam Angka
            </h2>
            <p className="text-teal-100 text-lg">
              Pencapaian yang membanggakan bersama komunitas kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10K+</div>
              <div className="text-teal-100">Resep Tersedia</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <div className="text-teal-100">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">1M+</div>
              <div className="text-teal-100">Pencarian Berhasil</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">4.8</div>
              <div className="text-teal-100">Rating Pengguna</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tim Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Dibangun oleh tim yang berpengalaman di bidang teknologi dan kuliner
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">AI</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tim AI Engineer</h3>
                <p className="text-gray-600">
                  Mengembangkan algoritma cerdas untuk pemahaman bahasa natural 
                  dan rekomendasi resep yang akurat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-beige-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ChefHat className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Culinary Expert</h3>
                <p className="text-gray-600">
                  Chef profesional yang memastikan setiap resep memiliki kualitas 
                  dan cita rasa yang sempurna.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">UX</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Designer</h3>
                <p className="text-gray-600">
                  Merancang pengalaman pengguna yang intuitif dan menyenangkan 
                  untuk semua kalangan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
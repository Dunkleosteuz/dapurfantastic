import { MessageSquare, Search, ChefHat, Heart } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Ceritakan Bahan Kamu',
    description: 'Ketik saja "Saya punya ayam, tomat, dan bawang" dalam bahasa natural',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100'
  },
  {
    icon: Search,
    title: 'AI Menganalisis',
    description: 'Teknologi AI kami akan memahami dan mencari resep yang cocok',
    color: 'text-teal-600',
    bgColor: 'bg-beige-200'
  },
  {
    icon: ChefHat,
    title: 'Dapatkan Resep',
    description: 'Terima rekomendasi resep terbaik dengan instruksi lengkap',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100'
  },
  {
    icon: Heart,
    title: 'Masak & Nikmati',
    description: 'Ikuti langkah-langkahnya dan nikmati masakan lezat kamu!',
    color: 'text-teal-700',
    bgColor: 'bg-beige-200'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-br from-beige-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja RecipeAI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dengan 4 langkah sederhana, temukan resep impian kamu
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-teal-200 to-beige-300 transform -translate-y-1/2 z-0"></div>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold">
            <span className="mr-2">✨</span>
            Siap untuk mencoba? Mulai sekarang!
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center text-center">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-heading tracking-tight">
            Hrash Designer
          </h1>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl text-slate-300">
            Ваш персональный ИИ - дизайнер
          </p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="mt-4 max-w-3xl text-slate-400">
            Создавайте всё: от потрясающих веб-сайтов и логотипов до маркетинговых материалов и вирусных обложек для видео. Просто опишите свою идею — остальное сделает искусственный интеллект.
          </p>
        </div>
        <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={onStart}
            className="bg-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
          >
            Начать творить
          </button>
        </div>
      </main>
      <Footer />
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
            opacity: 0;
          }
        `}</style>
    </>
  );
};

export default LandingPage;

import React, { useState, useRef } from 'react';
import { WebsiteData } from './types';
import { generateWebsite } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptInput from './components/PromptInput';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import WebsitePrototype from './components/WebsitePrototype';

type ViewMode = 'desktop' | 'mobile';
type ReferenceImage = { b64: string; mimeType: string; previewUrl: string; } | null;


declare global {
    interface Window {
        html2canvas: any;
        jspdf: any;
    }
}

const fileToGenerativePart = async (file: File): Promise<{b64: string, mimeType: string, previewUrl: string}> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        b64: await base64EncodedDataPromise,
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file),
    };
};


const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [referenceImage, setReferenceImage] = useState<ReferenceImage>(null);
  const prototypeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() && !referenceImage) {
        setError("Пожалуйста, введите промпт или загрузите изображение.");
        return;
    };

    setIsLoading(true);
    setError(null);
    // Do not clear old website data, to prevent screen flashing
    // setWebsiteData(null); 

    try {
      const imagePart = referenceImage ? { b64: referenceImage.b64, mimeType: referenceImage.mimeType } : null;
      const data = await generateWebsite(prompt, imagePart);
      setWebsiteData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setWebsiteData(null); // Clear data on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const imagePart = await fileToGenerativePart(file);
        setReferenceImage(imagePart);
    }
  };
  
  const handleImageRemove = () => {
    if (referenceImage) {
        URL.revokeObjectURL(referenceImage.previewUrl);
    }
    setReferenceImage(null);
  };

  const handleDownload = async () => {
    if (!prototypeRef.current || !window.html2canvas || !window.jspdf) {
        alert("Ошибка: Не удалось загрузить библиотеки для создания PDF.");
        return;
    };

    setIsDownloading(true);
    try {
        const { jsPDF } = window.jspdf;
        const canvas = await window.html2canvas(prototypeRef.current, {
            useCORS: true,
            scale: 2, 
            backgroundColor: websiteData?.theme.backgroundColor || '#111827',
            // Allow images with CORS to be painted
            allowTaint: true,
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('hrash-web-design.pdf');
    } catch (e) {
        console.error("Не удалось сгенерировать PDF:", e);
        setError("Произошла ошибка при создании PDF файла.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        {!websiteData && !isLoading && (
            <>
                <Header />
                <div className="max-w-3xl mx-auto text-center my-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">Создайте Произведение Искусства с Hrash Web</h2>
                    <p className="text-lg text-slate-400 mt-2">
                        Опишите идею или загрузите референс. Наш AI-дизайнер создаст уникальный макет, который вы полюбите.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PromptInput 
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSubmit={handleGenerate}
                        isLoading={isLoading}
                        onImageChange={handleImageChange}
                        onImageRemove={handleImageRemove}
                        imagePreviewUrl={referenceImage?.previewUrl || null}
                    />
                </div>
            </>
        )}
        
        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {websiteData && (
             <div className="animate-fade-in">
                {/* Control Bar */}
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-3 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-20 backdrop-blur-sm">
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white">Предпросмотр</h3>
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-slate-900 rounded-full p-1 border border-slate-600">
                            <button onClick={() => setViewMode('desktop')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${viewMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
                                Десктоп
                            </button>
                            <button onClick={() => setViewMode('mobile')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${viewMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
                                Мобайл
                            </button>
                        </div>
                        {/* Download Button */}
                        <button onClick={handleDownload} disabled={isDownloading} className="bg-green-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-colors flex items-center gap-2 disabled:bg-slate-500 disabled:cursor-wait">
                           {isDownloading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                           ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                           )}
                            <span className="hidden sm:inline">{isDownloading ? "Создание..." : "Скачать PDF"}</span>
                        </button>
                    </div>
                </div>
                 {/* Preview Container */}
                <div ref={prototypeRef} className={`mx-auto transition-all duration-500 ease-in-out ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'}`}>
                    <WebsitePrototype data={websiteData} />
                </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
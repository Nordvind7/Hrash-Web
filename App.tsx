


import React, { useState, useRef } from 'react';
import { DesignOutput, WebsiteData, DesignTypeId, GraphicAssetData } from './types';
import { generateDesign } from './services/geminiService';
import { DESIGN_TYPES } from './constants/design-types';

import Header from './components/Header';
import Footer from './components/Footer';
import PromptInput from './components/PromptInput';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import WebsitePrototype from './components/WebsitePrototype';
import DesignTypeSelector from './components/DesignTypeSelector';
import GraphicAssetViewer from './components/GraphicAssetViewer';


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

function isWebsiteData(output: DesignOutput): output is WebsiteData {
    return output.designType === 'website';
}

function getAssetTitle(output: DesignOutput): string {
    if (isWebsiteData(output)) {
        return "Предпросмотр Сайта";
    }
    if ('title' in output && output.title) {
        return output.title;
    }
    if ('name' in output && output.name) {
        return `Визитка: ${output.name}`;
    }
     if ('headline' in output && output.headline) {
        return output.headline;
    }
    const typeInfo = DESIGN_TYPES.find(d => d.id === output.designType);
    return typeInfo?.title || "Сгенерированный Дизайн";
}


const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [designOutput, setDesignOutput] = useState<DesignOutput | null>(null);
  const [selectedDesignType, setSelectedDesignType] = useState<DesignTypeId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [referenceImage, setReferenceImage] = useState<ReferenceImage>(null);
  
  const prototypeRef = useRef<HTMLDivElement>(null);
  const graphicAssetViewerRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!selectedDesignType) {
        setError("Пожалуйста, выберите тип дизайна.");
        return;
    }
    if (!prompt.trim() && !referenceImage) {
        setError("Пожалуйста, введите промпт или загрузите изображение.");
        return;
    };

    setIsLoading(true);
    setDesignOutput(null);
    setError(null);

    try {
      const imagePart = referenceImage ? { b64: referenceImage.b64, mimeType: referenceImage.mimeType } : null;
      const data = await generateDesign(selectedDesignType, prompt, imagePart);
      setDesignOutput(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setDesignOutput(null);
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
    if (!designOutput) return;

    if (isWebsiteData(designOutput)) {
        await handleDownloadPdf();
    } else {
        await handleDownloadImage();
    }
  };

  const handleDownloadImage = async () => {
    if (!graphicAssetViewerRef.current) {
        alert("Ошибка: Не удалось найти элемент для скачивания.");
        return;
    };
    setIsDownloading(true);
    try {
         const canvas = await window.html2canvas(graphicAssetViewerRef.current, {
            useCORS: true,
            scale: 2, 
            backgroundColor: null, // to preserve transparency
            allowTaint: true,
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        const title = getAssetTitle(designOutput!);
        link.download = `${title.replace(/\s/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch(e) {
        console.error("Не удалось сгенерировать PNG:", e);
        setError("Произошла ошибка при создании PNG файла.");
    } finally {
        setIsDownloading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!prototypeRef.current || !window.html2canvas || !window.jspdf) {
        alert("Ошибка: Не удалось загрузить библиотеки для создания PDF.");
        return;
    };

    setIsDownloading(true);
    try {
        const { jsPDF } = window.jspdf;
        const backgroundColor = isWebsiteData(designOutput!) ? designOutput.theme.backgroundColor : '#111827';
        const canvas = await window.html2canvas(prototypeRef.current, {
            useCORS: true,
            scale: 2, 
            backgroundColor: backgroundColor,
            allowTaint: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('hrash-designer-website.pdf');
    } catch (e) {
        console.error("Не удалось сгенерировать PDF:", e);
        setError("Произошла ошибка при создании PDF файла.");
    } finally {
        setIsDownloading(false);
    }
  };

  const resetState = () => {
    setDesignOutput(null);
    setSelectedDesignType(null);
    setPrompt('');
    setError(null);
    if(referenceImage) {
      URL.revokeObjectURL(referenceImage.previewUrl);
    }
    setReferenceImage(null);
  };

  const currentDesignType = selectedDesignType ? DESIGN_TYPES.find(d => d.id === selectedDesignType) : null;

  const renderContent = () => {
    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorDisplay message={error} />;
    }
    if (designOutput) {
        const isWebsite = isWebsiteData(designOutput);
        return (
             <div className="animate-fade-in w-full">
                {/* Control Bar */}
                <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-700 p-3 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-20">
                    <div className="flex items-center gap-3">
                       <button onClick={resetState} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                       </button>
                       <h3 className="text-lg sm:text-xl font-bold font-heading text-white">{getAssetTitle(designOutput)}</h3>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        {isWebsite && (
                            <div className="flex items-center bg-slate-900 rounded-full p-1 border border-slate-600">
                                <button onClick={() => setViewMode('desktop')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${viewMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
                                    Десктоп
                                </button>
                                <button onClick={() => setViewMode('mobile')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${viewMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
                                    Мобайл
                                </button>
                            </div>
                        )}
                        <button onClick={handleDownload} disabled={isDownloading} className="bg-green-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-colors flex items-center gap-2 disabled:bg-slate-500 disabled:cursor-wait">
                           {isDownloading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                           )}
                            <span className="hidden sm:inline">{isDownloading ? "..." : `Скачать ${isWebsite ? "PDF" : "PNG"}`}</span>
                        </button>
                    </div>
                </div>
                {isWebsite ? (
                    <div ref={prototypeRef} className={`mx-auto transition-all duration-500 ease-in-out ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'}`}>
                        <WebsitePrototype data={designOutput} />
                    </div>
                ) : (
                     <GraphicAssetViewer ref={graphicAssetViewerRef} data={designOutput as GraphicAssetData} />
                )}
            </div>
        );
    }
    
    if (!selectedDesignType) {
        return (
            <div className="w-full flex flex-col items-center animate-fade-in text-center">
                <div className="max-w-3xl mx-auto my-8">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">Hrash Designer</h2>
                    <p className="text-lg text-slate-400 mt-2">
                        Ваш персональный ИИ - дизайнер
                    </p>
                </div>
                <DesignTypeSelector onSelect={(typeId) => setSelectedDesignType(typeId)} />
            </div>
        )
    }

    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
             <button onClick={() => setSelectedDesignType(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 p-2 rounded-lg hover:bg-slate-800/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span>Все категории</span>
            </button>
            <h2 className="text-3xl font-bold text-white font-heading mb-2">Создать: {currentDesignType?.title}</h2>
            <p className="text-slate-400 mb-6">{currentDesignType?.description}</p>
            <PromptInput 
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleGenerate}
                isLoading={isLoading}
                onImageChange={handleImageChange}
                onImageRemove={handleImageRemove}
                imagePreviewUrl={referenceImage?.previewUrl || null}
                placeholder={currentDesignType?.placeholderPrompt || ''}
            />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex justify-center items-start">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

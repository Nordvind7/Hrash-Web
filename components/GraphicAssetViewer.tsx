import React from 'react';
import { GraphicAssetData } from '../types';

interface GraphicAssetViewerProps {
    data: GraphicAssetData;
}

const GraphicAssetViewer = React.forwardRef<HTMLDivElement, GraphicAssetViewerProps>(({ data }, ref) => {
    
    const renderContent = () => {
        switch (data.designType) {
            case 'logo':
                 return (
                    <div className="flex flex-col items-center p-4">
                        <h2 className="text-2xl font-bold text-white font-heading mb-6 text-center">{data.brandName}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 bg-white rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center p-4 shadow-lg">
                                    {data.colorLogoUrl && <img src={data.colorLogoUrl} alt="Color Logo" className="max-w-full max-h-full object-contain" />}
                                </div>
                                <p className="mt-3 text-slate-300 font-semibold">Цветная версия</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 bg-white rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center p-4 shadow-lg">
                                    {data.bwLogoUrl && <img src={data.bwLogoUrl} alt="B&W Logo" className="max-w-full max-h-full object-contain" />}
                                </div>
                                <p className="mt-3 text-slate-300 font-semibold">Ч/Б версия</p>
                            </div>
                        </div>
                    </div>
                );
            case 'marketing-kit':
                return (
                     <div className="w-[640px] aspect-[16/9] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-center p-10 text-white border border-slate-600" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                            <h1 className="text-3xl font-bold font-heading">{data.slideTitle}</h1>
                            <p className="text-lg mt-2 opacity-90">{data.mainThesis}</p>
                            <ul className="mt-4 space-y-2 list-disc list-inside">
                                {data.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    </div>
                );
            case 'checklist':
                 return (
                    <div className="w-[320px] aspect-[9/16] bg-cover bg-center rounded-lg shadow-lg flex flex-col p-6 text-slate-800 border border-slate-600" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <div className="bg-white/80 p-6 rounded-lg backdrop-blur-md h-full">
                            <h1 className="text-2xl font-bold font-heading text-slate-900">{data.title}</h1>
                             <ul className="mt-4 space-y-3">
                                {data.items.map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-slate-400 rounded-sm mr-3"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                 )
            case 'business-card':
                return (
                    <div className="w-[525px] h-[300px] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-between p-6 text-white" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <div>
                            <h3 className="text-2xl font-bold tracking-wider">{data.name}</h3>
                            <p className="text-md opacity-80">{data.jobTitle}</p>
                        </div>
                        <div className="text-right text-sm">
                            <p>{data.phone}</p>
                            <p>{data.email}</p>
                            <p>{data.website}</p>
                        </div>
                    </div>
                );
            case 'youtube-cover':
                 return (
                    <div className="w-[640px] h-[360px] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-end p-4 text-white" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <h1 className="text-4xl font-bold drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{data.headline}</h1>
                        {data.channelName && <p className="text-lg opacity-90 drop-shadow-md">{data.channelName}</p>}
                    </div>
                 );
            case 'ad-creative':
                 return (
                    <div className="w-[500px] h-[500px] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-between items-center text-center p-8 text-white" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <h2 className="text-3xl font-bold drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{data.headline}</h2>
                        <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-500 transition-colors">{data.callToAction}</button>
                    </div>
                 );
            case 'poster':
                return (
                    <div className="w-[400px] h-[600px] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-between p-8 text-white" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <div>
                            <h1 className="text-5xl font-bold drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{data.title}</h1>
                            <h2 className="text-2xl opacity-90 mt-2 drop-shadow-md">{data.subtitle}</h2>
                        </div>
                         <p className="text-lg font-semibold bg-black/50 p-2 rounded">{data.eventInfo}</p>
                    </div>
                );
            case 'lead-magnet':
                return (
                     <div className="w-[400px] h-[600px] bg-cover bg-center rounded-lg shadow-lg flex flex-col justify-center items-center text-center p-8 text-white" style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}>
                        <div className="bg-black/40 p-6 rounded-lg">
                            <h1 className="text-4xl font-bold drop-shadow-lg">{data.title}</h1>
                            <p className="text-xl mt-4 opacity-90">by {data.author}</p>
                        </div>
                    </div>
                )

            // Fallback for simple image assets
            case 'app-design':
            case 'article-cover':
                const aspectRatio = data.designType === 'app-design' ? 'aspect-[9/16]' : 'aspect-square';
                const maxWidth = data.designType === 'app-design' ? 'max-w-[300px]' : 'max-w-xl';
                return (
                     <div className={`w-full ${maxWidth} mx-auto flex flex-col items-center`}>
                        <h2 className="text-2xl font-bold text-white font-heading mb-6 text-center">{data.title}</h2>
                        <div className={`w-full ${aspectRatio} bg-slate-900 rounded-lg overflow-hidden border border-slate-600`}>
                            <img 
                                src={data.imageUrl} 
                                alt={data.title} 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                );
            default:
                return <div className="text-red-500">Error: Unknown asset type.</div>
        }
    }

    return (
        <div className="w-full flex justify-center items-center p-4">
             <div ref={ref} className="inline-block">
                {renderContent()}
            </div>
        </div>
    );
});

export default GraphicAssetViewer;
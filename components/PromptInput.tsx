
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  imagePreviewUrl: string | null;
  placeholder: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
    prompt, 
    setPrompt, 
    onSubmit, 
    isLoading,
    onImageChange,
    onImageRemove,
    imagePreviewUrl,
    placeholder
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg flex flex-col gap-4">
        {/* Main Prompt Textarea */}
        <div className="relative w-full">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full h-36 p-4 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 resize-none"
                disabled={isLoading}
            />
        </div>

        {/* Style Reference Uploader */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-700 rounded-lg">
             <div className="text-center sm:text-left">
                <h4 className="font-semibold text-white">Задать стиль</h4>
                <p className="text-sm text-slate-400">Добавьте изображение как референс (по желанию).</p>
             </div>
             <div className="flex-shrink-0">
                 {!imagePreviewUrl ? (
                    <label className="relative flex items-center justify-center h-12 px-6 bg-slate-700 text-slate-300 font-semibold rounded-lg shadow-sm hover:bg-slate-600 transition-all duration-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <span>Выбрать...</span>
                        <input type="file" accept="image/*" onChange={onImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                 ) : (
                    <div className="relative w-28 h-auto">
                        <img src={imagePreviewUrl} alt="Preview" className="w-full h-auto object-cover rounded-md shadow-md" />
                        <button onClick={onImageRemove} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                 )}
             </div>
        </div>

        {/* Submit Button */}
        <div className="mt-2 flex flex-col items-center">
            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Генерация...
                    </>
                ) : (
                    <>
                    <span className="sm:inline">Создать</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    </>
                )}
            </button>
            <p className="text-xs text-slate-400 mt-2">Нажмите <span className="font-semibold text-slate-300">Ctrl+Enter</span> для быстрой отправки.</p>
        </div>
    </div>
  );
};

export default PromptInput;

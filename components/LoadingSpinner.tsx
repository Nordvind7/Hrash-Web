
import React, { useState, useEffect } from 'react';

const messages = [
    "Анализирую вашу идею...",
    "Подбираю цветовую палитру...",
    "Эскизирую концепцию...",
    "Изучаю референсы...",
    "Пробую разные шрифты...",
    "Оживляю дизайн...",
    "Добавляю магию...",
    "Почти готово..."
];

const LoadingSpinner: React.FC = () => {
    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setCurrentMessage(messages[messageIndex]);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-10 text-center animate-fade-in">
             <svg width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-indigo-400 mb-6">
                <style>{`.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_YpZS{transform-origin:center;animation:spinner_zKoa 2s linear infinite;animation-delay:-.5s}.spinner__TBj{transform-origin:center;animation:spinner_zKoa 2s linear infinite;animation-delay:-1s}.spinner_4j7o{transform-origin:center;animation:spinner_zKoa 2s linear infinite;animation-delay:-1.5s}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}`}</style>
                <g className="spinner_V8m1"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3"/></g>
                <g className="spinner_YpZS"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(45 12 12)"/></g>
                <g className="spinner__TBj"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(90 12 12)"/></g>
                <g className="spinner_4j7o"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(135 12 12)"/></g>
                <g className="spinner_V8m1"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(180 12 12)"/></g>
                <g className="spinner_YpZS"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(225 12 12)"/></g>
                <g className="spinner__TBj"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(270 12 12)"/></g>
                <g className="spinner_4j7o"><rect x="11" y="1" width="2" height="5" rx="1" fill="currentColor" opacity=".3" transform="rotate(315 12 12)"/></g>
             </svg>
            <h3 className="text-xl font-semibold text-white font-heading transition-all duration-500">{currentMessage}</h3>
            <p className="text-slate-400 mt-2 max-w-sm">Искусственный интеллект создает уникальный дизайн и контент. Это может занять от 30 до 60 секунд.</p>
        </div>
    );
};

export default LoadingSpinner;

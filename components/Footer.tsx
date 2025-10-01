
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-500 p-4 mt-12 border-t border-slate-800">
      <div className="container mx-auto text-center text-sm">
        <p>Работает на базе API Google Gemini. Создано в демонстрационных целях.</p>
      </div>
    </footer>
  );
};

export default Footer;
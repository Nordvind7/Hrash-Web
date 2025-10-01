import React, { useMemo, useEffect } from 'react';
import { WebsiteData, NavLink, Feature, Testimonial } from '../types';

interface WebsitePrototypeProps {
  data: WebsiteData;
}

const SocialIcon: React.FC<{ platform: string }> = ({ platform }) => {
    switch(platform) {
        case 'Twitter': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.51-3.483 9.738-9.43 9.738-1.875 0-3.617-.55-5.088-1.49a6.896 6.896 0 0 0 5.02-1.788c-1.58-.03-2.91-1.08-3.37-2.522.22.04.44.06.66.06.32 0 .63-.04.92-.12-1.65-.33-2.88-1.81-2.88-3.58v-.05c.48.27.93.42 1.48.42-1.05-.71-1.65-1.92-1.65-3.28 0-.71.19-1.37.53-1.94 1.78 2.18 4.43 3.6 7.37 3.74-.06-.27-.09-.54-.09-.82 0-1.97 1.6-3.57 3.57-3.57.94 0 1.8.4 2.4 1.04.75-.15 1.46-.42 2.1-.8-.25.77-.77 1.42-1.45 1.83.66-.08 1.3-.25 1.88-.52-.45.65-.99 1.23-1.62 1.7z"/></svg>;
        case 'LinkedIn': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-2v-3.496c0-.833-.018-1.9-1.187-1.9-1.188 0-1.371.929-1.371 1.839v3.557h-2v-6h2v.896h.03c.27-.512.93-1.043 1.85-1.043 1.98 0 2.34 1.3 2.34 3.001v3.146z"/></svg>;
        case 'Instagram': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.502c0 1.379-1.12 2.502-2.501 2.502h-7c-1.381 0-2.5-1.123-2.5-2.502v-7c0-1.38 1.119-2.502 2.5-2.502h7c1.381 0 2.501 1.122 2.501 2.502v7zm-2-7.502c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-3.5 1.5c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5-1.119-2.5-2.5-2.5z"/></svg>;
        default: return null;
    }
}

const WebsitePrototype: React.FC<WebsitePrototypeProps> = ({ data }) => {
  const { theme, header, hero, features, testimonials, cta, footer } = data;

  useEffect(() => {
    if (theme.googleFontUrl) {
      const existingLink = document.querySelector(`link[href="${theme.googleFontUrl}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.href = theme.googleFontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
         try {
             document.head.removeChild(link);
         } catch(e) {
            // It might have already been removed by a quick re-render.
         }
      };
    }
  }, [theme.googleFontUrl]);

  const dynamicStyles = useMemo(() => ({
    '--primary-color': theme.primaryColor || '#4F46E5',
    '--accent-color': theme.accentColor || '#F59E0B',
    '--background-color': theme.backgroundColor || '#111827',
    '--text-color': theme.textColor || '#F3F4F6',
    '--heading-color': theme.headingColor || '#FFFFFF',
    '--subtle-text-color': theme.subtleTextColor || '#94A3B8',
    '--font-heading': theme.fontFamily?.heading || 'Poppins, sans-serif',
    '--font-body': theme.fontFamily?.body || 'Inter, sans-serif',
    '--border-radius': theme.borderRadius || '0.75rem',
  } as React.CSSProperties), [theme]);

  return (
    <div className="mt-8 border border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-[var(--background-color)] transition-all duration-500" style={dynamicStyles}>
      <div className="font-sans text-[var(--text-color)]" style={{ fontFamily: 'var(--font-body)' }}>
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}>{header.logoText}</div>
            <nav className="hidden md:flex space-x-6">
              {header.navLinks.map((link: NavLink) => (
                <a key={link.text} href={link.href} className="hover:text-[var(--primary-color)] transition-colors">{link.text}</a>
              ))}
            </nav>
            <button className="md:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            {hero.imageUrl && <img src={hero.imageUrl} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover z-[-1]" />}
            <div className="relative z-10 p-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in-down" style={{ fontFamily: 'var(--font-heading)' }}>{hero.headline}</h1>
                <p className="text-lg md:text-xl mb-8 drop-shadow-md animate-fade-in-up">{hero.subheadline}</p>
                <a href={hero.ctaButton.href} style={{ borderRadius: 'var(--border-radius)' }} className="bg-[var(--primary-color)] text-white font-bold py-3 px-8 text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-xl">
                {hero.ctaButton.text}
                </a>
            </div>
        </section>


        {/* Features Section */}
        <section className="py-20 sm:py-28">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}>{features.title}</h2>
                <p className="text-lg max-w-2xl mx-auto mb-16" style={{color: 'var(--subtle-text-color)'}}>{features.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {features.features.map((feature: Feature) => (
                    <div key={feature.title} className="flex flex-col items-center">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}>{feature.title}</h3>
                    <p style={{color: 'var(--subtle-text-color)'}}>{feature.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-slate-900/50 py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}>{testimonials.title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.testimonials.map((testimonial: Testimonial) => (
                        <div key={testimonial.author} style={{ borderRadius: 'var(--border-radius)' }} className="bg-[var(--background-color)] p-8 shadow-lg border border-slate-800 flex flex-col">
                            <p className="italic mb-6 flex-grow" style={{color: 'var(--subtle-text-color)'}}>"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                {testimonial.avatarUrl && <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4 bg-slate-700" />}
                                <div>
                                    <p className="font-bold" style={{color: 'var(--heading-color)'}}>{testimonial.author}</p>
                                    <p className="text-sm" style={{color: 'var(--subtle-text-color)'}}>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 sm:py-28">
            <div className="container mx-auto text-center px-4">
                 <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] p-12 shadow-2xl" style={{ borderRadius: 'var(--border-radius)' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{cta.headline}</h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{cta.subheadline}</p>
                     <a href="#" style={{ borderRadius: 'var(--border-radius)' }} className="bg-white text-[var(--primary-color)] font-bold py-3 px-8 text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-xl">
                        {cta.buttonText}
                    </a>
                 </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/50 border-t border-slate-800 py-10">
            <div className="container mx-auto text-center" style={{color: 'var(--subtle-text-color)'}}>
                <p className="mb-4">{footer.copyrightText}</p>
                <div className="flex justify-center space-x-6">
                {footer.socialLinks.map(link => (
                    <a key={link.platform} href={link.href} className="hover:text-[var(--primary-color)] transition-colors">
                        <SocialIcon platform={link.platform} />
                    </a>
                ))}
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default WebsitePrototype;
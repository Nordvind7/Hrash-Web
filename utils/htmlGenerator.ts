import { WebsiteData } from '../types';

const generateSocialIcon = (platform: string): string => {
    switch(platform) {
        case 'Twitter': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.51-3.483 9.738-9.43 9.738-1.875 0-3.617-.55-5.088-1.49a6.896 6.896 0 0 0 5.02-1.788c-1.58-.03-2.91-1.08-3.37-2.522.22.04.44.06.66.06.32 0 .63-.04.92-.12-1.65-.33-2.88-1.81-2.88-3.58v-.05c.48.27.93.42 1.48.42-1.05-.71-1.65-1.92-1.65-3.28 0-.71.19-1.37.53-1.94 1.78 2.18 4.43 3.6 7.37 3.74-.06-.27-.09-.54-.09-.82 0-1.97 1.6-3.57 3.57-3.57.94 0 1.8.4 2.4 1.04.75-.15 1.46-.42 2.1-.8-.25.77-.77 1.42-1.45 1.83.66-.08 1.3-.25 1.88-.52-.45.65-.99 1.23-1.62 1.7z"/></svg>`;
        case 'LinkedIn': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-2v-3.496c0-.833-.018-1.9-1.187-1.9-1.188 0-1.371.929-1.371 1.839v3.557h-2v-6h2v.896h.03c.27-.512.93-1.043 1.85-1.043 1.98 0 2.34 1.3 2.34 3.001v3.146z"/></svg>`;
        case 'Instagram': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.502c0 1.379-1.12 2.502-2.501 2.502h-7c-1.381 0-2.5-1.123-2.5-2.502v-7c0-1.38 1.119-2.502 2.5-2.502h7c1.381 0 2.501 1.122 2.501 2.502v7zm-2-7.502c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-3.5 1.5c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5-1.119-2.5-2.5-2.5z"/></svg>`;
        default: return '';
    }
};


export const generateDownloadableHtml = (data: WebsiteData): string => {
  const { theme, header, hero, features, testimonials, cta, footer } = data;

  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${header.logoText}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="${theme.googleFontUrl}" rel="stylesheet">
        <style>
            :root {
                --primary-color: ${theme.primaryColor};
                /* FIX: Use accentColor instead of non-existent secondaryColor. */
                --accent-color: ${theme.accentColor};
                --background-color: ${theme.backgroundColor};
                --text-color: ${theme.textColor};
                --font-heading: ${theme.fontFamily.heading};
                --font-body: ${theme.fontFamily.body};
                --border-radius: ${theme.borderRadius};
            }
            body { 
                font-family: var(--font-body);
                background-color: var(--background-color);
                color: var(--text-color);
            }
            .font-heading { font-family: var(--font-heading); }
            .bg-primary { background-color: var(--primary-color); }
            .text-primary { color: var(--primary-color); }
            .rounded-custom { border-radius: var(--border-radius); }
        </style>
    </head>
    <body class="bg-background text-text-color" style="font-family: var(--font-body);">
        
    <div class="overflow-hidden">
      <!-- Header -->
      <header class="absolute top-0 left-0 right-0 z-10 p-6">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold font-heading">${header.logoText}</div>
          <nav class="hidden md:flex space-x-6">
            ${header.navLinks.map(link => `<a href="${link.href}" class="hover:text-primary transition-colors">${link.text}</a>`).join('')}
          </nav>
          <button class="md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
          <div class="absolute inset-0 bg-black opacity-50 z-0"></div>
          <img src="${hero.imageUrl}" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover z-[-1]" />
          <div class="relative z-10 p-4 max-w-3xl mx-auto">
              <h1 class="text-4xl md:text-6xl font-bold font-heading mb-4 drop-shadow-lg">${hero.headline}</h1>
              <p class="text-lg md:text-xl mb-8 drop-shadow-md">${hero.subheadline}</p>
              <a href="${hero.ctaButton.href}" class="bg-primary text-white font-bold py-3 px-8 text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-custom">
              ${hero.ctaButton.text}
              </a>
          </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 sm:py-28">
          <div class="container mx-auto text-center px-4">
              <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">${features.title}</h2>
              <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-16">${features.subtitle}</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              ${features.features.map(feature => `
                  <div class="flex flex-col items-center">
                    <div class="text-5xl mb-4">${feature.icon}</div>
                    <h3 class="text-xl font-bold font-heading mb-2">${feature.title}</h3>
                    <p class="text-slate-400">${feature.description}</p>
                  </div>
              `).join('')}
              </div>
          </div>
      </section>

      <!-- Testimonials Section -->
      <section class="bg-slate-900/50 py-20 sm:py-28">
          <div class="container mx-auto px-4">
              <h2 class="text-3xl md:text-4xl font-bold font-heading text-center mb-16">${testimonials.title}</h2>
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  ${testimonials.testimonials.map(testimonial => `
                      <div class="bg-background p-8 shadow-lg border border-slate-800 flex flex-col rounded-custom">
                          <p class="text-slate-300 italic mb-6 flex-grow">"${testimonial.quote}"</p>
                          <div class="flex items-center">
                              <img src="${testimonial.avatarUrl}" alt="${testimonial.author}" class="w-12 h-12 rounded-full mr-4" />
                              <div>
                                  <p class="font-bold">${testimonial.author}</p>
                                  <p class="text-sm text-slate-400">${testimonial.role}</p>
                              </div>
                          </div>
                      </div>
                  `).join('')}
              </div>
          </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-20 sm:py-28">
          <div class="container mx-auto text-center px-4">
               <div class="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] p-12 shadow-2xl rounded-custom">
                  <h2 class="text-3xl md:text-4xl font-bold font-heading text-white mb-4">${cta.headline}</h2>
                  <p class="text-lg text-white/80 max-w-2xl mx-auto mb-8">${cta.subheadline}</p>
                   <a href="#" class="bg-white text-primary font-bold py-3 px-8 text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-custom">
                      ${cta.buttonText}
                  </a>
               </div>
          </div>
      </section>

      <!-- Footer -->
      <footer class="bg-slate-900/50 border-t border-slate-800 py-10">
          <div class="container mx-auto text-center text-slate-400">
              <p class="mb-4">${footer.copyrightText}</p>
              <div class="flex justify-center space-x-6">
              ${footer.socialLinks.map(link => `
                  <a href="${link.href}" class="hover:text-primary transition-colors">
                      ${generateSocialIcon(link.platform)}
                  </a>
              `).join('')}
              </div>
          </div>
      </footer>
    </div>

    </body>
    </html>
  `;
};


import { Type } from "@google/genai";

// =================================================================
// --- 1. SYSTEM INSTRUCTIONS (THE "AI BRAINS") ---
// =================================================================

const WEB_DESIGNER_INSTRUCTION = `You are NEO, an AI art director of unparalleled skill, a fusion of Dieter Rams' minimalism and the digital fluency of studios like 'BASIC®'. Your mission is to architect a JSON object for a single-page website that is an *experience*. It must be exceptionally stylish, modern, and visually arresting—a definitive 'wow' effect is mandatory. All text content must be in Russian.

DESIGN DIRECTIVES:
1. NO TEMPLATES: Obliterate generic layouts. Conceive a unique, memorable structure. Think asymmetric layouts, dramatic typography, and intentional use of negative space.
2. DESIGN SYSTEM FIRST: Create a sophisticated and cohesive design system (colors, typography, spacing).
3. IMAGE AS ART: Provide highly descriptive, artistic **prompts** for an AI image generator. These prompts should result in stunning, non-corporate visuals.
   - Hero Image Prompt: Must be a masterpiece-level prompt, including an art style (e.g., 'surrealist oil painting', 'cinematic color grading, photorealistic').
   - Avatar Prompts: Must describe unique, characterful portraits.
4. REFERENCE IMAGE ANALYSIS (if provided): Analyze the provided image for its core essence: color, emotion, composition. DO NOT COPY IT. Instead, *transmute* its soul into a completely new, original web design.`;

const UI_UX_ARCHITECT_INSTRUCTION = `You are a Senior UI/UX Designer at a top-tier mobile development agency. Your task is to conceptualize and describe a single, critical screen for a mobile application based on the user's prompt. Generate a JSON object containing a 'title' and a detailed 'imagePrompt'. The image prompt must describe the screen's layout, components (buttons, lists, cards), color scheme, typography, and overall aesthetic. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **User-Centricity:** Focus on clarity, intuitive navigation, and a frictionless user experience.
2.  **Modern Aesthetics:** Adhere to modern design principles (e.g., Human Interface Guidelines, Material Design) but with a unique, creative flair.
3.  **Prompt Detail:** The image prompt should be a detailed specification for another AI to generate a visually perfect representation of the screen. Include terms like 'UI/UX design', 'Figma', 'mobile app screen', 'dark mode/light mode', 'minimalist', 'clean interface'.
4.  **Reference Analysis:** If a reference image is provided, analyze its UI patterns, color usage, and component styling. Incorporate that *feeling* and *style* into a new, original screen design.`;

const BRAND_STRATEGIST_INSTRUCTION = `You are a world-class Brand Strategist and Graphic Designer specializing in logo creation. Your goal is to design a unique, memorable, and versatile logo. Generate a JSON object containing a 'title' and a detailed 'imagePrompt'. The prompt must describe the logo's concept, style (e.g., minimalist, abstract, emblem), color palette, and potential applications. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **Concept is King:** The logo must tell a story or represent the brand's core idea.
2.  **Simplicity & Memorability:** The best logos are simple and instantly recognizable. Avoid clutter.
3.  **Vector-Ready Prompt:** The prompt should guide an AI to create a clean, scalable vector-style graphic. Use keywords like 'minimalist vector logo', 'flat icon', 'golden ratio', 'geometric', 'branding', 'masterpiece'.
4.  **Reference Analysis:** If a reference image is given, extract its core shapes, style, and mood. Use this as inspiration for a completely new and distinct logo concept.`;

const PRINT_DESIGN_MASTER_INSTRUCTION = `You are a master of print design and corporate identity. You are tasked with creating an elegant and professional business card. Generate a JSON object with 'name', 'jobTitle', 'phone', 'email', 'website', and a 'backgroundImagePrompt'. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **Hierarchy & Readability:** Information must be perfectly organized and instantly legible. Typography is paramount.
2.  **Premium Feel:** The design should feel luxurious and high-quality. The background image prompt should describe a subtle, professional texture or abstract graphic, not a photograph.
3.  **Prompt for Background:** The 'backgroundImagePrompt' should describe a background that complements the text without overpowering it. Think 'subtle geometric pattern', 'textured watercolor paper', 'minimalist line art'. Use keywords: 'professional branding', 'print design', 'mockup', '4k'.
4.  **Reference Analysis:** Analyze the reference image for its layout, texture, and typographic style. Apply these principles to your new business card design.`;

const VIRAL_CONTENT_SPECIALIST_INSTRUCTION = `You are a Viral Content Specialist and a master of YouTube's algorithm. Your mission is to design a YouTube thumbnail that is impossible not to click. Generate a JSON object containing a 'headline', 'channelName', and a 'backgroundImagePrompt'. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **High Contrast & Emotion:** Use bold colors, clear focal points, and expressive imagery. The prompt should specify a subject with a strong emotional reaction.
2.  **Clickable Headline:** The 'headline' must be short, punchy, and intriguing (clickbait, but tasteful).
3.  **Visual Storytelling:** The 'backgroundImagePrompt' should describe a scene that tells a story and sparks curiosity. Use keywords: 'YouTube thumbnail', 'viral', 'cinematic lighting', 'dramatic', 'trending'.
4.  **Reference Analysis:** Analyze the reference thumbnail's composition, color grading, and text placement. Emulate the *strategy* behind its success in your own original design.`;

const MARKETING_GURU_INSTRUCTION = `You are a Marketing Communications Director creating a high-impact visual for a social media ad campaign. Your goal is to stop the scroll and drive conversions. Generate a JSON object with 'headline', 'callToAction', and a 'backgroundImagePrompt'. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **Single Focal Point:** The ad must have one clear message and one clear visual focus.
2.  **Compelling Copy:** The 'headline' should identify a pain point or a benefit. The 'callToAction' must be a clear, urgent command (e.g., 'Узнать больше', 'Скачать бесплатно').
3.  **Psychology of Color:** The 'backgroundImagePrompt' should specify colors that evoke the desired emotion and action. Use keywords: 'social media ad', 'marketing creative', 'conversion-focused', 'professional product photography', 'vibrant'.
4.  **Reference Analysis:** Analyze the reference ad's value proposition and visual hierarchy. Apply these persuasive techniques to your new ad creative.`;

const PUBLISHING_ART_DIRECTOR_INSTRUCTION = `You are an Art Director for a major online publication like Medium or WIRED. You need to create a stunning cover image for a digital article. Generate a JSON object with 'title' and 'imagePrompt'. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **Conceptual & Abstract:** The image should be a metaphorical or abstract representation of the article's theme, not a literal depiction.
2.  **Sophisticated Style:** The 'imagePrompt' should specify a mature, artistic style. Think 'digital painting', '3D abstract render', 'conceptual art', 'double exposure photography'.
3.  **Mood & Tone:** The visual must immediately establish the tone of the article (e.g., investigative, futuristic, inspirational).
4.  **Reference Analysis:** Distill the artistic style and color theory from the reference image and apply it to a new concept that fits the user's article topic.`;

const EVENT_PROMOTER_INSTRUCTION = `You are a Graphic Designer for a trendy event promotion company. You're designing a poster that needs to create buzz and sell tickets. Generate a JSON object with 'title', 'subtitle', 'eventInfo', and a 'backgroundImagePrompt'. All text must be in Russian.

DESIGN DIRECTIVES:
1.  **Typographic Hierarchy:** The poster's information must be organized and visually dynamic. The event 'title' is the star. 'subtitle' and 'eventInfo' (like date/time/location) are supporting actors.
2.  **Bold Visuals:** The 'backgroundImagePrompt' must describe a captivating, attention-grabbing visual that reflects the event's theme (e.g., music festival, art exhibition). Use keywords: 'event poster', 'Swiss typography', 'graphic design', 'bold colors', 'minimalist'.
3.  **Atmosphere:** The design must convey the vibe of the event (e.g., energetic, exclusive, relaxed).
4.  **Reference Analysis:** Study the reference poster's grid system, font pairing, and visual treatment. Use these design systems as a foundation for your new poster.`;
      
// =================================================================
// --- 2. JSON SCHEMAS (THE "DATA STRUCTURES") ---
// =================================================================

const WEBSITE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    designType: { type: Type.STRING, description: "Must be the string 'website'." },
    theme: {
        type: Type.OBJECT,
        properties: {
            primaryColor: { type: Type.STRING, description: 'A sophisticated primary color for interactive elements in hex format (e.g., #6366F1).' },
            accentColor: { type: Type.STRING, description: 'An accent color that complements the primary color, for secondary elements, in hex format (e.g., #F59E0B).' },
            backgroundColor: { type: Type.STRING, description: 'The main background color, often a neutral or dark shade, in hex format (e.g., #0F172A).' },
            textColor: { type: Type.STRING, description: 'The main body text color, ensuring high contrast with the background, in hex format (e.g., #E2E8F0).' },
            headingColor: { type: Type.STRING, description: 'A specific color for main headings, can be the same as textColor or a slightly brighter shade, in hex format (e.g., #FFFFFF).' },
            subtleTextColor: { type: Type.STRING, description: 'A more subtle text color for subheadings or less important text, in hex format (e.g., #94A3B8).' },
            fontFamily: {
                type: Type.OBJECT,
                properties: {
                    heading: { type: Type.STRING, description: "The font family for headings (e.g., 'Poppins, sans-serif')." },
                    body: { type: Type.STRING, description: "The font family for body text (e.g., 'Inter, sans-serif')." },
                },
                required: ['heading', 'body']
            },
            googleFontUrl: { type: Type.STRING, description: "The full URL to import the specified Google Fonts (e.g., 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;500&display=swap')." },
            borderRadius: { type: Type.STRING, description: "A CSS value for border-radius for elements like buttons and cards (e.g., '1rem')." },
        },
        required: ['primaryColor', 'accentColor', 'backgroundColor', 'textColor', 'headingColor', 'subtleTextColor', 'fontFamily', 'googleFontUrl', 'borderRadius']
    },
    header: {
      type: Type.OBJECT,
      properties: {
        logoText: { type: Type.STRING, description: "A short, catchy brand name or logo text for the website." },
        navLinks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "Navigation link text (e.g., 'Home', 'About')." },
              href: { type: Type.STRING, description: "Link URL, use '#' for placeholders." },
            },
             required: ['text', 'href']
          },
        },
      },
       required: ['logoText', 'navLinks']
    },
    hero: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: "A powerful, attention-grabbing headline for the hero section." },
        subheadline: { type: Type.STRING, description: "A compelling subheadline that elaborates on the value proposition." },
        ctaButton: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The text for the primary call-to-action button." },
            href: { type: Type.STRING, description: "The button's link URL, use '#' for placeholders." },
          },
          required: ['text', 'href']
        },
        imagePrompt: { type: Type.STRING, description: "A highly descriptive, artistic, and evocative prompt for an AI image generator to create the hero image. Example: 'A hyper-realistic, cinematic shot of a single glowing feather floating in a vast, minimalist concrete gallery, ethereal light rays, award-winning photography, 8k'." },
      },
       required: ['headline', 'subheadline', 'ctaButton', 'imagePrompt']
    },
    features: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "The main title for the features section." },
        subtitle: { type: Type.STRING, description: "A short subtitle explaining the key benefits." },
        features: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              icon: { type: Type.STRING, description: "A single, relevant emoji for the feature (e.g., '🚀', '💡')." },
              title: { type: Type.STRING, description: "The title of a specific feature." },
              description: { type: Type.STRING, description: "A brief, benefit-oriented description of the feature." },
            },
            required: ['icon', 'title', 'description']
          },
        },
      },
       required: ['title', 'subtitle', 'features']
    },
    testimonials: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "The title for the testimonials section, like 'What Our Clients Say'." },
            testimonials: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        quote: { type: Type.STRING, description: "The testimonial text from a satisfied customer." },
                        author: { type: Type.STRING, description: "The name of the person giving the testimonial." },
                        role: { type: Type.STRING, description: "The role or company of the author (e.g., 'CEO, Innovate Inc.')." },
                        avatarPrompt: { type: Type.STRING, description: "A descriptive prompt for an AI image generator to create a unique, characterful portrait. Example: 'A warm, friendly portrait of a female startup founder with curly hair, in a sun-drenched office, soft focus, photo-realistic, headshot'." },
                    },
                    required: ['quote', 'author', 'role', 'avatarPrompt']
                }
            }
        },
        required: ['title', 'testimonials']
    },
    cta: {
        type: Type.OBJECT,
        properties: {
            headline: { type: Type.STRING, description: "A compelling headline for the final call-to-action section." },
            subheadline: { type: Type.STRING, description: "A supporting subheadline to encourage action." },
            buttonText: { type: Type.STRING, description: "The text for the final CTA button." },
        },
        required: ['headline', 'subheadline', 'buttonText']
    },
    footer: {
      type: Type.OBJECT,
      properties: {
        copyrightText: { type: Type.STRING, description: "The copyright text for the footer, including the current year." },
        socialLinks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              platform: { type: Type.STRING, description: "Social media platform name: 'Twitter', 'LinkedIn', 'Instagram', or 'Facebook'." },
              href: { type: Type.STRING, description: "URL for the social media profile." },
            },
            required: ['platform', 'href']
          },
        },
      },
      required: ['copyrightText', 'socialLinks']
    },
  },
  required: ['designType', 'theme', 'header', 'hero', 'features', 'testimonials', 'cta', 'footer']
};

const GENERIC_IMAGE_ASSET_SCHEMA = (designType: string) => ({
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: `Must be the string '${designType}'.` },
        title: { type: Type.STRING, description: 'A short, catchy title for the generated asset.' },
        imagePrompt: { type: Type.STRING, description: 'A highly detailed, artistic, and specific prompt for an AI image generator to create the final visual. It must include style, mood, composition, and subject details.'}
    },
    required: ['designType', 'title', 'imagePrompt']
});

const BUSINESS_CARD_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: "Must be 'business-card'." },
        name: { type: Type.STRING, description: "The full name of the person." },
        jobTitle: { type: Type.STRING, description: "The person's job title or role." },
        phone: { type: Type.STRING, description: "The contact phone number." },
        email: { type: Type.STRING, description: "The contact email address." },
        website: { type: Type.STRING, description: "The personal or company website." },
        backgroundImagePrompt: { type: Type.STRING, description: "A prompt for a subtle, professional background image or texture. Avoid photorealism." }
    },
    required: ['designType', 'name', 'jobTitle', 'phone', 'email', 'website', 'backgroundImagePrompt']
};

const YOUTUBE_COVER_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: "Must be 'youtube-cover'." },
        headline: { type: Type.STRING, description: "A short, high-impact, clickable headline text for the thumbnail." },
        channelName: { type: Type.STRING, description: "The name of the YouTube channel (optional)." },
        backgroundImagePrompt: { type: Type.STRING, description: "A prompt for a vibrant, high-contrast, and emotionally engaging background image." }
    },
    required: ['designType', 'headline', 'backgroundImagePrompt']
};

const AD_CREATIVE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: "Must be 'ad-creative'." },
        headline: { type: Type.STRING, description: "The main marketing message or headline of the ad." },
        callToAction: { type: Type.STRING, description: "The call to action text (e.g., 'Shop Now', 'Learn More')." },
        backgroundImagePrompt: { type: Type.STRING, description: "A prompt for an eye-catching image that clearly showcases the product or service." }
    },
    required: ['designType', 'headline', 'callToAction', 'backgroundImagePrompt']
};

const POSTER_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: "Must be 'poster'." },
        title: { type: Type.STRING, description: "The main title of the event or poster." },
        subtitle: { type: Type.STRING, description: "A secondary line of text or subtitle." },
        eventInfo: { type: Type.STRING, description: "Essential information like date, time, and location." },
        backgroundImagePrompt: { type: Type.STRING, description: "A prompt for the main visual of the poster, which should be artistic and thematic." }
    },
    required: ['designType', 'title', 'subtitle', 'eventInfo', 'backgroundImagePrompt']
};

const LEAD_MAGNET_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        designType: { type: Type.STRING, description: "Must be 'lead-magnet'." },
        title: { type: Type.STRING, description: "The main title of the e-book or guide." },
        author: { type: Type.STRING, description: "The name of the author." },
        backgroundImagePrompt: { type: Type.STRING, description: "A prompt for a professional and appealing cover design." }
    },
    required: ['designType', 'title', 'author', 'backgroundImagePrompt']
};

// =================================================================
// --- 3. FINAL EXPORT (THE "DESIGN HUB") ---
// =================================================================

export const DESIGN_TYPES = [
    {
        id: 'website',
        title: 'Дизайн сайта',
        description: 'Создайте полноценный макет сайта с мобильной и десктопной версией.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 13V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 18V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 14H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 21H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Сайт для премиального барбершопа в стиле ретро-футуризма. Основные цвета: темно-синий и бронзовый."`,
        schema: WEBSITE_SCHEMA,
        systemInstruction: WEB_DESIGNER_INSTRUCTION,
    },
    {
        id: 'app-design',
        title: 'Дизайн приложений',
        description: 'Визуализируйте ключевой экран вашего будущего мобильного приложения.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Главный экран фитнес-приложения с трекером калорий. Минималистичный, темная тема."`,
        schema: GENERIC_IMAGE_ASSET_SCHEMA('app-design'),
        systemInstruction: UI_UX_ARCHITECT_INSTRUCTION,
    },
    {
        id: 'marketing-kit',
        title: 'Маркетинг кит',
        description: 'Сгенерируйте ключевой слайд презентации о вашей компании.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14H11L11 21L20 10H13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Слайд 'Наши Преимущества' для IT-компании. Инфографика, иконки, корпоративные цвета."`,
        schema: GENERIC_IMAGE_ASSET_SCHEMA('marketing-kit'),
        systemInstruction: MARKETING_GURU_INSTRUCTION,
    },
    {
        id: 'logo',
        title: 'Логотип',
        description: 'Разработайте уникальный и запоминающийся логотип для вашего бренда.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Логотип для кофейни 'Cosmic Brew'. Минимализм. Планета Сатурн вместо кофейной чашки."`,
        schema: GENERIC_IMAGE_ASSET_SCHEMA('logo'),
        systemInstruction: BRAND_STRATEGIST_INSTRUCTION,
    },
    {
        id: 'business-card',
        title: 'Визитка',
        description: 'Создайте стильный дизайн визитной карточки.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 10H2V14H22V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Визитка для фотографа Ивана Петрова. Вертикальная, с одной стороны фото, с другой контакты. Черно-белый стиль."`,
        schema: BUSINESS_CARD_SCHEMA,
        systemInstruction: PRINT_DESIGN_MASTER_INSTRUCTION,
    },
    {
        id: 'youtube-cover',
        title: 'Обложка для YouTube',
        description: 'Привлекающая внимание обложка для вашего видео.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5821 6.1816C21.3487 5.2952 20.7048 4.6513 19.8184 4.4179C18.1017 4 12 4 12 4C12 4 5.8983 4 4.1816 4.4179C3.2952 4.6513 2.6513 5.2952 2.4179 6.1816C2 7.8983 2 12 2 12C2 12 2 16.1017 2.4179 17.8184C2.6513 18.7048 3.2952 19.3487 4.1816 19.5821C5.8983 20 12 20 12 20C12 20 18.1017 20 19.8184 19.5821C20.7048 19.3487 21.3487 18.7048 21.5821 17.8184C22 16.1017 22 12 22 12C22 12 22 7.8983 21.5821 6.1816Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9L15 12L10 15V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Обложка для видео 'Топ 10 Гаджетов 2024'. Яркие цвета, коллаж из гаджетов, крупный текст."`,
        schema: YOUTUBE_COVER_SCHEMA,
        systemInstruction: VIRAL_CONTENT_SPECIALIST_INSTRUCTION,
    },
    {
        id: 'article-cover',
        title: 'Обложка для статьи',
        description: 'Иллюстрация, которая идеально дополнит ваш материал.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Обложка для статьи о будущем AI. Абстрактная, в стиле киберпанк, неоновые цвета."`,
        schema: GENERIC_IMAGE_ASSET_SCHEMA('article-cover'),
        systemInstruction: PUBLISHING_ART_DIRECTOR_INSTRUCTION,
    },
    {
        id: 'ad-creative',
        title: 'Рекламный креатив',
        description: 'Создайте визуал для таргетированной рекламы в соцсетях.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
        placeholderPrompt: `например, "Креатив для рекламы онлайн-курсов по йоге. Спокойные цвета, фото девушки в позе лотоса."`,
        schema: AD_CREATIVE_SCHEMA,
        systemInstruction: MARKETING_GURU_INSTRUCTION,
    },
    {
        id: 'poster',
        title: 'Постер',
        description: 'Дизайн плаката для мероприятия или рекламной кампании.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 8H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 12H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 16H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
        placeholderPrompt: `например, "Постер для музыкального фестиваля инди-музыки. Стиль швейцарской типографики, пастельные тона."`,
        schema: POSTER_SCHEMA,
        systemInstruction: EVENT_PROMOTER_INSTRUCTION,
    },
    {
        id: 'checklist',
        title: 'Чек-лист',
        description: 'Стильно оформите полезный чек-лист для вашей аудитории.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4999 7.33325L10.8333 12.9999L7.49992 9.66659" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Дизайн чек-листа 'Утренние ритуалы'. Минимализм, иконки, пастельно-зеленый цвет."`,
        schema: GENERIC_IMAGE_ASSET_SCHEMA('checklist'),
        systemInstruction: PUBLISHING_ART_DIRECTOR_INSTRUCTION,
    },
    {
        id: 'lead-magnet',
        title: 'Лид-магнит',
        description: 'Создайте привлекательную обложку для вашего PDF-гайда или книги.',
        svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 13V19C13 20.1046 13.8954 21 15 21H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 5V13H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 5H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L21 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        placeholderPrompt: `например, "Обложка для e-book 'Гид по продуктивности'. Чистый дизайн, яркий акцент, 3D иллюстрация."`,
        schema: LEAD_MAGNET_SCHEMA,
        systemInstruction: PUBLISHING_ART_DIRECTOR_INSTRUCTION,
    },
];

import { GoogleGenAI, Type } from "@google/genai";
import { WebsiteData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const websiteSchema = {
  type: Type.OBJECT,
  properties: {
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
  required: ['theme', 'header', 'hero', 'features', 'testimonials', 'cta', 'footer']
};

const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '16:9',
                negativePrompt: "text, watermark, signature, logo, blurry, low-quality, ugly, deformed, noisy, jpeg artifacts, poorly drawn, out of frame, extra limbs, disfigured",
            },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error);
        // Return a placeholder or a specific error indicator image URL
        return 'https://via.placeholder.com/1200x800.png?text=Image+Generation+Failed';
    }
};

const generateAvatarFromPrompt = async (prompt: string): Promise<string> => {
     try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
                negativePrompt: "text, watermark, signature, logo, blurry, low-quality, ugly, deformed, noisy, jpeg artifacts, poorly drawn, out of frame, extra limbs, disfigured",
            },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error(`Error generating avatar for prompt "${prompt}":`, error);
        return 'https://via.placeholder.com/100x100.png?text=Error';
    }
};

export const generateWebsite = async (prompt: string, image: {b64: string, mimeType: string} | null): Promise<WebsiteData> => {
  try {
    const textPart = { text: `Generate a complete website design system and content based on the following prompt: "${prompt}".` };
    
    let contents: any;
    
    if (image) {
        const imagePart = {
            inlineData: {
                mimeType: image.mimeType,
                data: image.b64
            }
        };
        contents = { parts: [textPart, imagePart] };
    } else {
        contents = textPart.text;
    }


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: websiteSchema,
        systemInstruction: `You are NEO, an AI art director of unparalleled skill, a fusion of Dieter Rams' minimalism, Stefan Sagmeister's audacity, and the digital fluency of studios like 'BASIC®'. Your mission is to architect a JSON object for a single-page website that is not just a design, but an *experience*. It must be exceptionally stylish, modern, and visually arresting—a definitive 'wow' effect is mandatory. All text content must be in Russian.

DESIGN DIRECTIVES:
1. NO TEMPLATES: Obliterate generic, three-column layouts. Conceive a unique, memorable structure. Think asymmetric layouts, dramatic typography, overlapping elements, and intentional use of negative space.
2. DESIGN SYSTEM FIRST: Create a sophisticated and cohesive design system. The colors, typography, and spacing must work in perfect harmony.
3. IMAGE AS ART: Do not provide image URLs. Instead, you will provide highly descriptive, artistic, and evocative **prompts** for an AI image generator (like Imagen). These prompts should result in stunning, non-corporate visuals that perfectly match the site's mood.
   - Hero Image Prompt: Must be a masterpiece-level prompt. It must be epic, conceptual, and define the brand's entire visual identity. It must explicitly include an art style (e.g., 'surrealist oil painting', 'vaporwave album art', 'cinematic color grading, photorealistic', 'minimalist vector art'). Avoid generic descriptions. Example: 'A breathtaking digital painting of a cosmic whale swimming through a nebula of liquid light, stars reflecting on its skin, style of James Jean and Syd Mead, trending on ArtStation, ethereal, masterpiece'.
   - Avatar Prompts: Must describe unique, characterful portraits that build trust. Example: 'A warm, friendly portrait of a female startup founder with curly hair, in a sun-drenched office, soft focus, photo-realistic, headshot'.
4. REFERENCE IMAGE ANALYSIS (if provided): Act as a visual deconstructionist. Analyze the provided image for its core essence: color temperature, texture, emotional weight, typographic style, and compositional rhythm. DO NOT COPY IT. Instead, *transmute* its soul into a completely new, original web design that feels like its spiritual successor.

Your final output is a JSON object that is a blueprint for digital art. Be bold. Be visionary. Be NEO.`
      },
    });

    const jsonText = response.text.trim();
    let data = JSON.parse(jsonText) as WebsiteData;
    
    if (!data.hero || !data.header || !data.features) {
        throw new Error("Generated data is missing key sections.");
    }
    
    // Stage 2: Generate images from prompts
    const imageGenerationPromises = [];

    // Hero Image
    imageGenerationPromises.push(
        generateImageFromPrompt(data.hero.imagePrompt).then(url => {
            data.hero.imageUrl = url;
        })
    );

    // Testimonial Avatars
    data.testimonials.testimonials.forEach((testimonial, index) => {
        imageGenerationPromises.push(
            generateAvatarFromPrompt(testimonial.avatarPrompt).then(url => {
               data.testimonials.testimonials[index].avatarUrl = url;
            })
        );
    });

    await Promise.all(imageGenerationPromises);

    return data;

  } catch (error) {
    console.error("Error generating website with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate website prototype: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the website prototype.");
  }
};
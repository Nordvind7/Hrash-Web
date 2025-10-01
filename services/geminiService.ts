import { GoogleGenAI, Type } from "@google/genai";
import { DesignOutput, DesignTypeId } from '../types';
import { DESIGN_TYPES } from '../constants/design-types';

if (!process.env.VITE_GEMINI_API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

// --- IMAGE GENERATION ---

const getAspectRatioForAsset = (designTypeId: DesignTypeId, key: string): '16:9' | '1:1' | '9:16' => {
    if (key.toLowerCase().includes('avatar')) return '1:1';
    
    switch (designTypeId) {
        case 'youtube-cover':
        case 'marketing-kit':
        case 'ad-creative':
            return '16:9';
        case 'lead-magnet':
        case 'checklist':
        case 'app-design':
            return '9:16';
        default:
            return '1:1';
    }
};

const generateImage = async (prompt: string, aspectRatio: '16:9' | '1:1' | '9:16'): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: aspectRatio,
            },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error);
        const [width, height] = aspectRatio === '1:1' ? ['800', '800'] : aspectRatio === '16:9' ? ['1280', '720'] : ['720', '1280'];
        return `https://via.placeholder.com/${width}x${height}.png?text=Image+Generation+Failed`;
    }
};

// Recursive function to find and replace image prompts with URLs
async function processImagePrompts(data: any, designTypeId: DesignTypeId): Promise<any> {
    if (Array.isArray(data)) {
        return Promise.all(data.map(item => processImagePrompts(item, designTypeId)));
    }
    if (typeof data === 'object' && data !== null) {
        const newData = { ...data };
        const promises: Promise<void>[] = [];
        
        const keys = Object.keys(newData);
        for (const key of keys) {
            if (typeof newData[key] === 'object' && newData[key] !== null) {
                 newData[key] = await processImagePrompts(newData[key], designTypeId);
            }
        }
        
        for (const key of keys) {
            if (key.toLowerCase().endsWith('prompt') && typeof newData[key] === 'string' && newData[key]) {
                const urlKey = key.replace(/prompt$/i, 'Url');
                const aspectRatio = getAspectRatioForAsset(designTypeId, key);
                promises.push(
                    generateImage(newData[key], aspectRatio).then(url => {
                        newData[urlKey] = url;
                    })
                );
            }
        }
        
        await Promise.all(promises);
        return newData;
    }
    return data;
}

// --- MAIN SERVICE ---

export const generateDesign = async (
    designTypeId: DesignTypeId,
    prompt: string, 
    image: {b64: string, mimeType: string} | null
): Promise<DesignOutput> => {
    try {
        const designType = DESIGN_TYPES.find(d => d.id === designTypeId);
        if (!designType) {
            throw new Error(`Invalid design type specified: ${designTypeId}`);
        }

        let contents: any;
        const textPart = { text: `User Prompt: "${prompt}".\n\nTask: ${designType.description}` };
        if (image) {
            contents = { parts: [textPart, { inlineData: { mimeType: image.mimeType, data: image.b64 } }] };
        } else {
            contents = textPart.text;
        }

        // --- Stage 1: Generate structure and text prompts ---
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: designType.schema,
                systemInstruction: designType.systemInstruction,
            },
        });

        const jsonText = response.text.trim();
        const generatedData = JSON.parse(jsonText);

        // --- Stage 2: Recursively find and generate all images ---
        const finalData = await processImagePrompts(generatedData, designTypeId);
        
        return finalData as DesignOutput;

    } catch (error) {
        console.error("Error generating design with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate design: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the design.");
    }
};
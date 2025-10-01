import { GoogleGenAI } from "@google/genai";
import { DesignOutput, DesignTypeId } from '../../types';
import { DESIGN_TYPES } from '../../constants/design-types';

// This is a Netlify function, so we can use environment variables safely on the server.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    // This function will fail during build if the key is missing, which is intended.
    throw new Error("The API_KEY environment variable is not set in the Netlify deployment configuration.");
}
const ai = new GoogleGenAI({ apiKey });


// --- All the helper functions from the old service ---
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
        return `https://via.placeholder.com/${width}x${height}.png?text=Image+Gen+Failed`;
    }
};

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

// --- The Netlify handler ---
export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { designTypeId, prompt, image } = JSON.parse(event.body);

        const designType = DESIGN_TYPES.find(d => d.id === designTypeId);
        if (!designType) {
            return { statusCode: 400, body: JSON.stringify({ error: `Invalid design type: ${designTypeId}` }) };
        }
        
        let contents: any;
        const textPart = { text: `User Prompt: "${prompt}".\n\nTask: ${designType.description}` };
        if (image) {
            contents = { parts: [textPart, { inlineData: { mimeType: image.mimeType, data: image.b64 } }] };
        } else {
            contents = textPart.text;
        }

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
        
        const finalData = await processImagePrompts(generatedData, designTypeId);
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData),
        };

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || "An unknown server error occurred." }),
        };
    }
};

import { DesignOutput, DesignTypeId } from '../types';

export const generateDesign = async (
    designTypeId: DesignTypeId,
    prompt: string, 
    image: {b64: string, mimeType: string} | null
): Promise<DesignOutput> => {
    
    // The frontend now calls our own secure serverless function
    // instead of the Google Gemini API directly.
    const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            designTypeId,
            prompt,
            image,
        }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        // Forward the error from the serverless function to the UI
        throw new Error(responseBody.error || `Request failed with status ${response.status}`);
    }

    return responseBody as DesignOutput;
};

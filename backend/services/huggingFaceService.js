const config = require('../config');

/**
 * Call Hugging Face Inference API via the OpenAI-compatible chat completions endpoint
 */
async function callInferenceAPI(message) {
    const url = 'https://router.huggingface.co/v1/chat/completions';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.requestTimeout);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.hfApiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: config.hfModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You are Nova, a helpful and friendly AI assistant. Give clear, concise answers.',
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                max_tokens: 256,
                temperature: 0.7,
                top_p: 0.9,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HF Inference API error (${response.status}): ${errorBody}`);
        }

        const data = await response.json();

        // OpenAI-compatible response format
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message?.content || data.choices[0].text || '';
        }

        return typeof data === 'string' ? data : JSON.stringify(data);
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            throw new Error('Request to Hugging Face timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Call a Hugging Face Space (Gradio API)
 */
async function callSpaceAPI(message) {
    const baseUrl = config.hfSpaceUrl.replace(/\/$/, '');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.requestTimeout);

    try {
        // Try the newer Gradio API format first
        let url = `${baseUrl}/api/predict`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(config.hfApiToken ? { 'Authorization': `Bearer ${config.hfApiToken}` } : {}),
            },
            body: JSON.stringify({
                data: [message],
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HF Space API error (${response.status}): ${errorBody}`);
        }

        const data = await response.json();

        // Gradio returns { data: [...] }
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            return data.data[0];
        }

        return typeof data === 'string' ? data : JSON.stringify(data);
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            throw new Error('Request to Hugging Face Space timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Main entry point — tries Space API first, falls back to Inference API
 */
async function getAIResponse(message) {
    // Try Space API first if configured
    if (config.hfSpaceUrl) {
        try {
            console.log(`[HF Service] Trying Space API: ${config.hfSpaceUrl}`);
            return await callSpaceAPI(message);
        } catch (spaceError) {
            console.warn(`[HF Service] Space API failed: ${spaceError.message}`);
            console.log('[HF Service] Falling back to Inference API...');
        }
    }

    // Fallback to Inference API
    console.log(`[HF Service] Using Inference API: ${config.hfModel}`);
    return callInferenceAPI(message);
}

module.exports = { getAIResponse };


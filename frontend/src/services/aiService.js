const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : '';

/**
 * Send a message to the AI backend
 * @param {string} message - The user's message
 * @returns {Promise<string>} - The AI response text
 */
export async function sendMessage(message) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);

    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Server error (${response.status})`);
        }

        return data.response;
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. The AI model may be loading — please try again in a moment.');
        }
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to the server. Please ensure the backend is running on port 5000.');
        }
        throw error;
    }
}

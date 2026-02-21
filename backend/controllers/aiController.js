const { getAIResponse } = require('../services/huggingFaceService');

/**
 * POST /api/ai/query
 * Request:  { "message": "User input" }
 * Response: { "response": "Model output" }
 */
async function handleQuery(req, res) {
    try {
        const { message } = req.body;

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                error: 'Invalid request. "message" field is required and must be a non-empty string.',
            });
        }

        console.log(`[AI Controller] Received query: "${message.substring(0, 80)}..."`);

        const aiResponse = await getAIResponse(message.trim());

        console.log(`[AI Controller] Response received (${aiResponse.length} chars)`);

        return res.json({
            response: aiResponse,
        });
    } catch (error) {
        console.error('[AI Controller] Error:', error.message);

        // Determine status code
        const statusCode = error.message.includes('timed out') ? 504 : 500;

        return res.status(statusCode).json({
            error: error.message || 'An unexpected error occurred while processing your request.',
        });
    }
}

module.exports = { handleQuery };

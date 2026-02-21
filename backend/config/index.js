require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Hugging Face
  hfApiToken: process.env.HF_API_TOKEN || '',
  hfModel: process.env.HF_MODEL || 'meta-llama/Llama-3.2-1B-Instruct',
  hfSpaceUrl: process.env.HF_SPACE_URL || '',

  // Timeouts
  requestTimeout: 30000, // 30 seconds
};

module.exports = config;

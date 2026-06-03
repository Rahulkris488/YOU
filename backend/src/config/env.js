const dotenv = require('dotenv');

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/you',
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  claudeApiKey: process.env.CLAUDE_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};

module.exports = env;
module.exports.env = env;

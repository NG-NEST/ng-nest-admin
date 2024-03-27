import { GeminiModel } from './gemini.enum';

export const GEMINI_URL = 'https://generativelanguage.googleapis.com';
export const GEMINI_GENERATION_URL = `${GEMINI_URL}/v1/models`;

export const GEMINI_MODELS = Object.values(GeminiModel);

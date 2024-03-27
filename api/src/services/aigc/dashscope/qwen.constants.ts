import { QwenModel } from './qwen.enum';

export const DASHSCOPE_URL = 'https://dashscope.aliyuncs.com';
export const DASHSCOPE_GENERATION_URL = `${DASHSCOPE_URL}/api/v1/services/aigc/text-generation/generation`;

export const QWEN_MODELS = Object.values(QwenModel);

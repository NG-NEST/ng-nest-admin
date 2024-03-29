import { AigcType } from './aigc.enum';
import { QWEN_MODELS } from './dashscope';
import { GEMINI_MODELS } from './gemini';
import { QIANFAN_MODELS } from './qianfan';

export const AIGC_TYPES = Object.values(AigcType);
export const AIGC_MODELS = [...QWEN_MODELS, ...GEMINI_MODELS, ...QIANFAN_MODELS];

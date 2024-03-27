import { QwenModel } from './dashscope';
import { GeminiModel } from './gemini';

export const AigcI18n = 'aigc';

export enum AigcDescription {
  Type = 'Type',
  Model = 'Model',
  Prompt = 'Prompt',
}

export enum AigcType {
  Qwen = 'qwen',
  Gemini = 'gemini',
}

export type AigcModel = QwenModel | GeminiModel;

import { QwenMessage, QwenModel } from './dashscope';
import { GeminiModel } from './gemini';
import { QianFanModel } from './qianfan';

export const AigcI18n = 'aigc';

export enum AigcDescription {
  Type = 'Type',
  Model = 'Model',
  Prompt = 'Prompt',
  Messages = 'Messages',
}

export enum AigcType {
  Qwen = 'qwen',
  Gemini = 'gemini',
  QianFan = 'qianfan',
}

export type AigcModel = QwenModel | GeminiModel | QianFanModel;

export type AigcMessageInput = QwenMessage;

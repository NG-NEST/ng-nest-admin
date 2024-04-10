import { QwenMessage, QwenModel } from './dashscope';
import { GeminiModel } from './gemini';
import { QianFanMessage, QianFanModel } from './qianfan';

export const AIGC_I18N = 'aigc';

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

export type AigcMessageInput = QwenMessage | QianFanMessage;

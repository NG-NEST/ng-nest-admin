import { QwenModel } from './dashscope';

export const AigcI18n = 'aigc';

export enum AigcDescription {
  Type = 'Type',
  Model = 'Model',
  Prompt = 'Prompt',
}

export enum AigcType {
  Qwen = 'qwen',
}

export enum AigcModeMy {}

export type AigcModel = QwenModel | AigcModeMy;

import OpenAI from 'openai';

// 定义输入参数接口
export interface OpenAIInput {
  // 使用接口平台
  platform?: string;

  // 消息内容，支持多种格式
  messages?: OpenAI.Chat.ChatCompletionMessageParam[];
  prompt?: string;
  system?: string;

  // 模型配置参数
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;

  // 其他可选参数
  [key: string]: any; // 允许其他自定义属性
}

// 定义文本生成输出接口
export interface TextGenerationOutput {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAI.Chat.Completions.ChatCompletion.Choice[];
  usage?: OpenAI.CompletionUsage;
}

// 定义流式输出接口
export interface TextGenerationStreamOutput {
  id: string;
  object: string;
  created: number;
  model: string;
  content: string;
  finishReason?: string | null;
}

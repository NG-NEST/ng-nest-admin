import { Injectable } from '@nestjs/common';
import { AigcInput } from './aigc.input';
import { QwenService } from './dashscope/qwen.service';
import { AigcType } from './aigc.enum';
import { QwenModel } from './dashscope';
import { GeminiService } from './gemini/gemini.service';
import { GeminiModel } from './gemini';

@Injectable()
export class AigcService {
  constructor(
    private readonly qwenService: QwenService,
    private readonly geminiService: GeminiService,
  ) {}

  async textGeneration(input: AigcInput) {
    const { type, model, prompt } = input;
    if (type === AigcType.Qwen) {
      return this.qwenService.textGeneration({ model: model as QwenModel, prompt });
    } else if (type === AigcType.Gemini) {
      return this.geminiService.textGeneration({ model: model as GeminiModel, prompt });
    }
  }
}

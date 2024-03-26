import { Injectable } from '@nestjs/common';
import { AigcInput } from './aigc.input';
import { QwenService } from './dashscope/qwen.service';
import { AigcType } from './aigc.enum';
import { QwenModel } from './dashscope';

@Injectable()
export class AigcService {
  constructor(private readonly qwenService: QwenService) {}

  async textGeneration(input: AigcInput) {
    const { type, model, prompt } = input;
    if (type === AigcType.Qwen) {
      return this.qwenService.textGeneration({ model: model as QwenModel, prompt });
    }
  }
}

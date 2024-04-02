import { Injectable } from '@nestjs/common';
import { AigcInput } from './aigc.input';
import { QwenService } from './dashscope/qwen.service';
import { AigcType } from './aigc.enum';
import { QwenMessage, QwenModel } from './dashscope';
import { GeminiService } from './gemini/gemini.service';
import { GeminiModel } from './gemini';
import { Observable, of } from 'rxjs';
import { QianFanModel, QianFanService } from './qianfan';
import { AigcOutput } from './aigc.output';
import { AigcStreamOutput } from './aigc-stream.output';
import { AigcStreamInput } from './aigc-stream.input';
import { QianFanMessage } from './qianfan/qianfan-stream.input';

@Injectable()
export class AigcService {
  constructor(
    private readonly qwenService: QwenService,
    private readonly geminiService: GeminiService,
    private readonly qianfanService: QianFanService,
  ) {}

  async textGeneration(input: AigcInput): Promise<AigcOutput> {
    const { type, model, prompt } = input;
    if (type === AigcType.Qwen) {
      return this.qwenService.textGeneration({ model: model as QwenModel, prompt });
    } else if (type === AigcType.Gemini) {
      return this.geminiService.textGeneration({ model: model as GeminiModel, prompt });
    } else if (type === AigcType.QianFan) {
      return this.qianfanService.textGeneration({ model: model as QianFanModel, prompt });
    }
    return null;
  }

  textGenerationSubject(input: AigcStreamInput): Observable<AigcStreamOutput> {
    const { type, model, messages } = input;
    if (type === AigcType.Qwen) {
      return this.qwenService.textGenerationSubject({
        model: model as QwenModel,
        messages: messages as QwenMessage[],
      });
    } else if (type === AigcType.QianFan) {
      return this.qianfanService.textGenerationSubject({
        model: model as QianFanModel,
        messages: messages as QianFanMessage[],
      });
    }
    return of();
  }
}

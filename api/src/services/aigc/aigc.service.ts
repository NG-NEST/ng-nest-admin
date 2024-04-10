import { Injectable } from '@nestjs/common';
import { AigcInput } from './aigc.input';
import { AigcType } from './aigc.enum';
import { QwenMessage, QwenService, QwenModel } from './dashscope';
import { GeminiModel, GeminiService } from './gemini';
import { Observable, delay, of } from 'rxjs';
import { QianFanModel, QianFanService, QianFanMessage } from './qianfan';
import { AigcOutput } from './aigc.output';
import { AigcStreamOutput } from './aigc-stream.output';
import { AigcStreamInput } from './aigc-stream.input';

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

    return await of().pipe(delay(10000)).toPromise();
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
    } else if (type === AigcType.Gemini) {
      return this.geminiService.textGenerationSubject(input);
    }
    return of();
  }
}

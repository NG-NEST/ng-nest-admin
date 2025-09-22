import { BadRequestException, Injectable } from '@nestjs/common';
import { DashscopeService } from './dashscope.service';
import { OpenAIInput, TextGenerationOutput, TextGenerationStreamOutput } from './openai.interface';
import { Observable } from 'rxjs';

@Injectable()
export class OpenAIService {
  constructor(private readonly dashscopeService: DashscopeService) {}

  async textGeneration(input: OpenAIInput): Promise<TextGenerationOutput> {
    switch (input.platform) {
      case 'dashscope':
        return this.dashscopeService.textGeneration(input);
      default:
        throw new BadRequestException(`Platform ${input.platform} not supported`);
    }
  }

  textGenerationSubject(input: OpenAIInput): Observable<TextGenerationStreamOutput> {
    switch (input.platform) {
      case 'dashscope':
        return this.dashscopeService.textGenerationSubject(input);
      default:
        throw new BadRequestException(`Platform ${input.platform} not supported`);
    }
  }
}

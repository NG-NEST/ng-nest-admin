import { BadRequestException, Injectable } from '@nestjs/common';
import { GEMINI_GENERATION_URL } from './gemini.constants';
import { ConfigService } from '@nestjs/config';
import { GeminiInput } from './gemini.input';

@Injectable()
export class GeminiService {
  constructor(private config: ConfigService) {}

  async textGeneration(input: GeminiInput) {
    const { model, prompt } = input;
    const response = await fetch(`${GEMINI_GENERATION_URL}/${model}:generateContent`, {
      method: 'POST',
      headers: this.setHeader(),
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new BadRequestException(data);
    }
  }

  private setHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-goog-api-key', this.config.getOrThrow('GEMINI_API_KEY'));
    return headers;
  }
}

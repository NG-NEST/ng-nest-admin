import { GeminiRole } from './gemini.enum';

export class GeminiStreamInput {
  contents: GeminiMessage[];
}

export class GeminiMessage {
  role: GeminiRole;
  parts: GeminiPart[];
}

export class GeminiPart {
  text: string;
}

import { QwenModel, QwenRole } from './qwen.enum';

export class QwenStreamInput {
  model: QwenModel;
  messages: QwenMessage[];
}

export class QwenMessage {
  role: QwenRole;
  content: string;
}

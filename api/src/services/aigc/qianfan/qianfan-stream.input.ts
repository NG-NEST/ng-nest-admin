import { QianFanModel, QianFanRole } from './qianfan.enum';

export class QianFanStreamInput {
  model: QianFanModel;
  messages: QianFanMessage[];
}

export class QianFanMessage {
  role: QianFanRole;
  content: string;
}

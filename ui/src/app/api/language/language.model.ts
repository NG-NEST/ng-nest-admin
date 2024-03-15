import { BaseAudit } from '@ui/core';

export class Language extends BaseAudit {
  id!: string;
  key!: string;
  value?: string;
  languageCode!: string;
}

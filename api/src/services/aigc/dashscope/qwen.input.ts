import { IsIn, IsNotEmpty } from 'class-validator';
import { QwenModel } from './qwen.enum';
import { QwenDescription, QwenI18n } from './qwen.enum';
import { ValidatorDescription, i18n } from '@api/core';
import { QWEN_MODELS } from './qwen.constants';

export class QwenInput {
  @IsNotEmpty({
    message: i18n(`${QwenI18n}.${QwenDescription.Model}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(QWEN_MODELS, {
    message: i18n(`${QwenI18n}.${QwenDescription.Model}${ValidatorDescription.IsIn}`),
  })
  model: QwenModel;

  @IsNotEmpty({
    message: i18n(`${QwenI18n}.${QwenDescription.Prompt}${ValidatorDescription.IsNotEmpty}`),
  })
  prompt: string;
}

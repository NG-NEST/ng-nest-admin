import { IsIn, IsNotEmpty } from 'class-validator';
import { AIGC_MODELS, AIGC_TYPES } from './aigc.constants';
import { AigcDescription, AIGC_I18N, AigcModel, AigcType } from './aigc.enum';
import { ValidatorDescription, I18N } from '@api/core';

export class AigcInput {
  @IsNotEmpty({
    message: I18N(`${AIGC_I18N}.${AigcDescription.Type}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(AIGC_TYPES, {
    message: I18N(`${AIGC_I18N}.${AigcDescription.Type}${ValidatorDescription.IsIn}`),
  })
  type: AigcType;

  @IsNotEmpty({
    message: I18N(`${AIGC_I18N}.${AigcDescription.Model}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(AIGC_MODELS, {
    message: I18N(`${AIGC_I18N}.${AigcDescription.Model}${ValidatorDescription.IsIn}`),
  })
  model: AigcModel;

  @IsNotEmpty({
    message: I18N(`${AIGC_I18N}.${AigcDescription.Prompt}${ValidatorDescription.IsNotEmpty}`),
  })
  prompt: string;
}

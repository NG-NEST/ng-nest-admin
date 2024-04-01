import { IsIn, IsNotEmpty } from 'class-validator';
import { AIGC_MODELS, AIGC_TYPES } from './aigc.constants';
import { AigcDescription, AigcI18n, AigcMessageInput, AigcModel, AigcType } from './aigc.enum';
import { ValidatorDescription, i18n } from '@api/core';

export class AigcStreamInput {
  @IsNotEmpty({
    message: i18n(`${AigcI18n}.${AigcDescription.Type}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(AIGC_TYPES, {
    message: i18n(`${AigcI18n}.${AigcDescription.Type}${ValidatorDescription.IsIn}`),
  })
  type: AigcType;

  @IsNotEmpty({
    message: i18n(`${AigcI18n}.${AigcDescription.Model}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(AIGC_MODELS, {
    message: i18n(`${AigcI18n}.${AigcDescription.Model}${ValidatorDescription.IsIn}`),
  })
  model: AigcModel;

  @IsNotEmpty({
    message: i18n(`${AigcI18n}.${AigcDescription.Messages}${ValidatorDescription.IsNotEmpty}`),
  })
  messages: AigcMessageInput[];
}

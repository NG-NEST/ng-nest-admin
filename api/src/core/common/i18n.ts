import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export const i18n = i18nValidationMessage<I18nTranslations>;

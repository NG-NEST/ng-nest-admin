import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import {
  camelize,
  capitalize,
  classify,
  constantize,
  dasherize,
  decamelize,
  filter,
  jsonSchemaToFields,
  jsonSchemaToPrismaSchema,
  underscore,
  XJsonSchema,
} from '../functions';

/**
 * Register default supported functions
 */

Handlebars.registerHelper('$decamelize', (str: string) => {
  return decamelize(str);
});

Handlebars.registerHelper('$dasherize', (str: string) => {
  return dasherize(str);
});

Handlebars.registerHelper('$camelize', (str: string) => {
  return camelize(str);
});

Handlebars.registerHelper('$classify', (str: string) => {
  return classify(str);
});

Handlebars.registerHelper('$underscore', (str: string) => {
  return underscore(str);
});

Handlebars.registerHelper('$constantize', (str: string) => {
  return constantize(str);
});

Handlebars.registerHelper('$capitalize', (str: string) => {
  return capitalize(str);
});

Handlebars.registerHelper(
  '$jsonSchemaToPrismaSchema',
  (jsonSchema: XJsonSchema, modelName: string) => {
    return jsonSchemaToPrismaSchema(jsonSchema, modelName);
  },
);

Handlebars.registerHelper('$jsonSchemaToFields', (jsonSchema: XJsonSchema) => {
  return jsonSchemaToFields(jsonSchema);
});

Handlebars.registerHelper('$filter', (array: any[], options: string) => {
  return filter(array, options);
});

@Injectable()
export class TemplateService {
  generate(content: string, vars: { [key: string]: any }) {
    if (!content) return '';
    const template = Handlebars.compile(content);
    const ctx = template(vars);

    return ctx;
  }
}

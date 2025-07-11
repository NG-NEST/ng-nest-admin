import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import {
  camelize,
  capitalize,
  classify,
  constantize,
  dasherize,
  decamelize,
  underscore,
} from '../functions';

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

@Injectable()
export class TemplateService {
  generate(content: string, vars: { [key: string]: any }) {
    if (!content) return '';
    const template = Handlebars.compile(content);
    const ctx = template(vars);

    return ctx;
  }
}

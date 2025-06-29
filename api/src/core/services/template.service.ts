import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  generate(content: string, vars: { [key: string]: any }) {
    if (!content) return '';
    const template = Handlebars.compile(content);
    const ctx = template(vars);

    return ctx;
  }
}

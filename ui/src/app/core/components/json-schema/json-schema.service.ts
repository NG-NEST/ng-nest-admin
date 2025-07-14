import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { XTreeData } from './json-schema.type';
import { isArray, isObject } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class AppJsonSchemaService {
  fb = inject(FormBuilder);

  createNodeForm(node: XTreeData): FormGroup {
    const {
      id,
      title,
      type,
      name,
      required,
      isJsonSchema,
      nullable,
      description,
      children,
      isEnum,
      examples,
      ...other
    } = node;

    for (let key in other) {
      if (isObject(other[key]) || isArray(other[key])) {
        delete other[key];
      }
    }

    const group = this.fb.group<XTreeData>({
      id,
      title,
      name,
      type,
      required,
      isJsonSchema,
      nullable,
      description,
      ...other
    });

    return group;
  }

  buildTreeForm(nodes: XTreeData[]): FormGroup[] {
    const flatNodes = this.convertToFlat(nodes);
    return flatNodes.map((node) => this.createNodeForm(node));
  }

  private convertToFlat(nodes: XTreeData[], result: XTreeData[] = []): XTreeData[] {
    nodes.forEach((node) => {
      const flatNode = { ...node };
      result.push(flatNode);
      if (node.children && node.children.length) {
        this.convertToFlat(node.children, result);
      }
    });
    return result;
  }
}

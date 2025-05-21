import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { XTreeData } from './json-schema.type';

@Injectable({ providedIn: 'root' })
export class AppJsonSchemaService {
  constructor(private fb: FormBuilder) {}

  createNodeForm(node: XTreeData): FormGroup {
    const {
      id,
      title,
      type,
      name,
      required,
      nullable,
      description,
      children,
      isEnum,
      examples,
      ...other
    } = node;

    if (isEnum) {
      delete other.enums;
    }

    const group = this.fb.group<XTreeData>({
      id,
      title,
      name,
      type,
      required,
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

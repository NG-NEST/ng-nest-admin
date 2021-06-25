import { Select } from '@ng-nest/api/core';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity('design_control')
export class Control {
  @PrimaryColumn('uuid', { length: 36, type: 'char' })
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  required?: boolean;

  @Column({ nullable: true })
  disabled?: boolean;

  @Column({ nullable: true })
  readonly?: boolean;

  @Column({ nullable: true })
  hide?: boolean;

  @Column({ nullable: null })
  primary?: boolean;

  @Column()
  sort: number;

  @Column({ nullable: true, type: 'json' })
  col?: ColType;

  @Column({ type: 'json' })
  type: ControlType;

  @Column({ nullable: true, type: 'json' })
  group?: Object;

  @Column({ length: 36, type: 'char' })
  pageId: string;

  @ManyToOne(
    type => Page,
    page => page.controls,
    { onDelete: 'CASCADE' }
  )
  page: Page;
}

export interface ControlType extends Select<ControlEnum> {}

export interface ColType extends Select<ColEnum> {}

export enum ColEnum {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Eleven = 11,
  Twelve = 12
}

export enum ControlEnum {
  Input = 'input',
  Checkbox = 'checkbox',
  Buttons = 'buttons',
  Select = 'select',
  Findback = 'findback',
  AddItem = 'add-item'
}

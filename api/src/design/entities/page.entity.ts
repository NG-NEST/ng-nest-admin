import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Module } from './module.entity';
import { Control } from './control.entity';

@Entity('design_page')
export class Page {
  @PrimaryColumn('uuid', { length: 36, type: 'char' })
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, length: 36, type: 'char' })
  moduleId: string;

  @ManyToOne(
    type => Module,
    module => module.pages,
    { onDelete: 'CASCADE' }
  )
  module: Module;

  @ManyToMany(
    type => Page,
    page => page
  )
  @JoinTable({
    name: 'design_page_relation',
    joinColumn: { name: 'fromPageId' },
    inverseJoinColumn: { name: 'toPageId' }
  })
  fromPages: Page[];

  @ManyToMany(
    type => Page,
    page => page
  )
  @JoinTable({
    name: 'design_page_relation',
    joinColumn: { name: 'toPageId' },
    inverseJoinColumn: { name: 'fromPageId' }
  })
  toPages: Page[];

  @OneToMany(
    type => Control,
    control => control.page
  )
  controls: Control[];
}

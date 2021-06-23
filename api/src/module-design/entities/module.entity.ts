import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Page } from './page.entity';
import { Table } from './table.entity';

@Entity('design_module')
export class Module {
  @PrimaryColumn('uuid', { length: 36, type: 'char' })
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany(
    type => Page,
    page => page.module
  )
  pages: Page[];

  @OneToMany(
    type => Table,
    table => table.module
  )
  tables: Table[];
}

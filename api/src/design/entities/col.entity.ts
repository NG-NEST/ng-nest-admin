import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Table } from './table.entity';

@Entity('design_col')
export class Col {
  @PrimaryColumn('uuid', { length: 36, type: 'char' })
  id: string;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  sort: number;

  @Column({ nullable: true, type: 'json' })
  type?: Object;

  @Column({ nullable: true })
  length?: number;

  @Column({ nullable: true })
  primary?: boolean;

  @Column({ nullable: true })
  nullable?: boolean;

  @Column({ nullable: true })
  unique?: boolean;

  @Column({ nullable: true })
  default?: string;

  @Column({ length: 36, type: 'char' })
  tableId: string;

  @ManyToOne(
    type => Table,
    table => table.cols,
    { onDelete: 'CASCADE' }
  )
  table: Table;
}

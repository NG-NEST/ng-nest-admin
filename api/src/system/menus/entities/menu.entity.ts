import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Action } from '../../actions/entities/action.entity';

@Entity('system_menu')
export class Menu {
  @PrimaryColumn('uuid', { length: 36 })
  id: string;

  @Column()
  label: string;

  @Column()
  router?: string;

  @Column()
  icon: string;

  @Column()
  sort?: number;

  @Column({ nullable: true, length: 36, name: 'parentId' })
  pid?: string;

  @Column({ nullable: true, type: 'text' })
  path?: string;

  @ManyToOne(
    type => Menu,
    menu => menu.children
  )
  parent: Menu;

  @OneToMany(
    type => Menu,
    menu => menu.parent
  )
  children: Menu[];

  @OneToMany(
    type => Action,
    action => action.menu
  )
  actions: Action[];
}

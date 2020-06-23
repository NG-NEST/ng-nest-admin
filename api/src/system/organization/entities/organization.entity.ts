import { Entity, Column, ManyToOne, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('system_organization')
export class Organization {
  @PrimaryColumn('uuid', { length: 36 })
  id: string;

  @Column()
  label: string;

  @Column()
  type: string;

  @Column()
  icon: string;

  @Column({ nullable: true, length: 36 })
  pid?: string;

  @Column({ nullable: true, type: 'text' })
  path?: string;

  @ManyToOne(
    () => Organization,
    organization => organization.children
  )
  parent: Organization;

  @OneToMany(
    () => Organization,
    organization => organization.parent
  )
  children: Organization[];

  @ManyToMany(
    () => User,
    user => user.organizations
  )
  users: User[];
}

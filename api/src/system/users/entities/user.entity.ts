import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('system_user')
export class User {
  @PrimaryColumn('uuid', { length: 36 })
  id: string;

  @Column({ length: 36 })
  name: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToMany(
    type => Organization,
    organization => organization
  )
  @JoinTable({
    name: 'system_user_organization',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: Organization[];

  @ManyToMany(
    type => Role,
    role => role
  )
  @JoinTable({
    name: 'system_user_role',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' }
  })
  roles: Role[];
}

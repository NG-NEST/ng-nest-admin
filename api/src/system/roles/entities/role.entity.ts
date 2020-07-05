
import { Entity, Column, ManyToMany, PrimaryColumn, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Action } from '../../actions/entities/action.entity';
import { Organization } from '../../organization/entities/organization.entity';

@Entity("system_role")
export class Role {
    @PrimaryColumn("uuid", { length: 36 })
    id: string;

    @Column()
    name: string;

    @Column({ length: 36 })
    organizationId: string;

    @ManyToOne(type => Organization, organization => organization.roles, { onDelete: 'CASCADE' })
    organization: Organization;

    @ManyToMany(type => User, user => user.roles)
    @JoinTable({
        name: "system_user_role",
        joinColumn: { name: 'roleId' },
        inverseJoinColumn: { name: 'userId' }
    })
    users: User[];

    @ManyToMany(type => Action, action => action.roles)
    @JoinTable({
        name: "system_role_action",
        joinColumn: { name: 'roleId' },
        inverseJoinColumn: { name: 'actionId' }
    })
    actions: Action[];
}
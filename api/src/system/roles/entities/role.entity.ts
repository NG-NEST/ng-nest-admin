
import { Entity, Column, ManyToMany, PrimaryColumn, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Action } from '../../actions/entities/action.entity';

@Entity("system_role")
export class Role {
    @PrimaryColumn("uuid", { length: 36 })
    id: string;

    @Column()
    name: string;

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
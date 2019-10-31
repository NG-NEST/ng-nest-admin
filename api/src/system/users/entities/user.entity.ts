
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity("system_user")
export class User {
    @PrimaryColumn("uuid", { length: 36 })
    id: string;

    @Column({ length: 36 })
    name: string;

    @Column()
    account: string;

    @Column()
    password: string;

    @Column()
    organization: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}

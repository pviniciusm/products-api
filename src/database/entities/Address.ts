import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Client } from "./Client";

@Entity({
    schema: "produtos"
})
export class Address extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 36
    })
    uid: string;

    @Column({
        length: 30,
        nullable: false
    })
    street: string;

    @Column({
        nullable: false
    })
    number: number;

    @ManyToOne(() => Client)
    @JoinColumn({
        name: "client_uid"
    })
    client: Client;

    @CreateDateColumn()
    created_at: Date;
}

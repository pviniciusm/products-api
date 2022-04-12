import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { Address } from "./Address";

@Entity({
    schema: 'produtos',
    name: 'client'
})
export class Client extends BaseEntity {
    @PrimaryColumn({
        length: 36
    })
    uid: string;

    @Column({
        length: 50,
        nullable: false
    })
    name: string;

    @Column()
    age: number;

    // @Column({
    //     type: 'timestamp',
    //     nullable: false,
    //     default: 'now()'
    // })
    // created_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Address, address => address.client)
    address: Address[];
}

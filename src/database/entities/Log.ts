import {BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { v4 as createUuid } from "uuid";
import { Client } from "./Client";

@Entity({
    schema: "produtos"
})
export class Log extends BaseEntity {
    @PrimaryColumn({
        type: 'uuid'
    })
    uid: string;

    @Column({
        length: 1,
        nullable: false
    })
    type: string;

    @Column({
        nullable: false,
        length: 30
    })
    entity: string;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    private beforeInsert() {
        this.uid = createUuid();
    }
}

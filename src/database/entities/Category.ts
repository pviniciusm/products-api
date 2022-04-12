import { v4 as createUuid } from 'uuid';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "categoria",
    schema: "produtos"
})
export class Category {
    @PrimaryColumn({
        type: 'uuid'
    })
    uid: string;

    @Column({
        length: 30,
        nullable: false
    })
    nome: string;

    @Column({
        length: 50,
        nullable: false
    })
    descricao: string;

    @Column({
        nullable: false
    })
    tag: number;

    @Column({
        type: "timestamp",
        nullable: true
    })
    created_at: Date;

    
    @Column({
        type: "timestamp",
        nullable: true
    })
    updated_at: Date;

    constructor(descricao: string, nome: string, tag: number) {
        this.descricao = descricao;
        this.nome = nome;
        this.tag = tag;

        this.uid = createUuid();

        // this.created_at = new Date();
    }

    @BeforeInsert()
    private beforeInsert() {
        this.created_at = new Date();
        this.updated_at = this.created_at;
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updated_at = new Date();
    }
}

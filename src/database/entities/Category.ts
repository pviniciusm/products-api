import { Column, Entity, PrimaryColumn } from "typeorm";

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
}

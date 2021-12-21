import { Connection, getConnection } from "typeorm";

export class CategoryController {
    private readonly connection: Connection;

    constructor() {
        this.connection = getConnection();
    }

    async create(name: string, description: string, tag: number) {
        try {
            await this.connection.query(
                `INSERT INTO produtos.categoria 
                (nome, descricao, tag)
                VALUES
                ($1, $2, $3)
                `, [name, description, tag]
            );
    
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    async list() {
        let result = await this.connection.query(
            `SELECT * FROM produtos.categoria`
        );

        return {
            ok: true,
            data: result
        }
    }
}
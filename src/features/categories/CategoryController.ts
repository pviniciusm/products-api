import { Connection, getConnection, Repository } from "typeorm";
import { Category } from "../../database/entities/Category";

export class CategoryController {
    private readonly connection: Connection;
    private readonly repository: Repository<Category>;

    constructor() {
        this.connection = getConnection();
        this.repository = this.connection.getRepository(Category);
    }

    async create(name: string, description: string, tag: number) {
        try {
            // await this.connection.query(
            //     `INSERT INTO produtos.categoria 
            //     (nome, descricao, tag)
            //     VALUES
            //     ($1, $2, $3)
            //     `, [name, description, tag]
            // );

            let category = this.repository.create({
                descricao: name,
                nome: description,
                tag: tag
            });

            this.repository.save(category);
    
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
        // let result = await this.connection.query(
        //     `SELECT * FROM produtos.categoria`
        // );

        let result = await this.connection.manager.find(Category);

        let result2 = await this.repository.find();

        return {
            ok: true,
            data: result2
        }
    }
}
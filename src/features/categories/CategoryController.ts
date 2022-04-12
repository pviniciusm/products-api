import { Connection, EntityNotFoundError, getConnection, Repository } from "typeorm";
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
            // let category = this.repository.create({
            //     descricao: name,
            //     nome: description,
            //     tag: tag
            // });

            let category = new Category(description, name, tag);
            console.log(category);
            
            await this.repository.save(category);
            console.log(category);
    
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

    async update(uid: string, description: string) {
        try {
            let category = await this.repository.findOne(uid);

            if(!category) {
                return {
                    ok: false,
                    error: "category not found"
                }
            }

            category.descricao = description;

            await this.repository.save(category);

            return {
                ok: true
            }

        } catch(error) {
            return {
                ok: false,
                error
            }
        }
    }
}
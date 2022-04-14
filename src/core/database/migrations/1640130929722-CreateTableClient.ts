import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableClient1640130929722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     CREATE TABLE ....
        // `)

        await queryRunner.createTable(new Table({
            name: 'client',
            schema: 'produtos',
            columns: [
                { name: 'uid', type: 'varchar', length: "36", isPrimary: true },
                { name: 'name', type: 'varchar', length: "50", isNullable: false },
                { name: 'age', type: 'numeric' },
                { name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()' },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos.client");
    }

}

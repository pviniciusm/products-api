import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterCategoryAddCreatedAt1640302523746 implements MigrationInterface {
    name = 'AlterCategoryAddCreatedAt1640302523746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos"."categoria" ADD "created_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos"."categoria" DROP COLUMN "created_at"`);
    }

}

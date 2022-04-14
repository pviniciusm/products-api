import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterCategoryAddUpdatedAt1640303028269 implements MigrationInterface {
    name = 'AlterCategoryAddUpdatedAt1640303028269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos"."categoria" ADD "updated_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos"."categoria" DROP COLUMN "updated_at"`);
    }

}

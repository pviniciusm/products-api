import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableLog1640303980709 implements MigrationInterface {
    name = 'CreateTableLog1640303980709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtos"."log" ("uid" uuid NOT NULL, "type" character varying(1) NOT NULL, "entity" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9a3aa518c4f2a6177bc73997caf" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produtos"."log"`);
    }

}

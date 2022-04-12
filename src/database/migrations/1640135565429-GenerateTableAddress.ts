import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateTableAddress1640135565429 implements MigrationInterface {
    name = 'GenerateTableAddress1640135565429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtos"."address" ("uid" character varying(36) NOT NULL, "street" character varying(30) NOT NULL, "number" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "client_uid" character varying(36), CONSTRAINT "PK_bc4bc6e46734dd3a7f8cd71c687" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "produtos"."address" ADD CONSTRAINT "FK_95e4409cfab042b067af3bebd57" FOREIGN KEY ("client_uid") REFERENCES "produtos"."client"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos"."address" DROP CONSTRAINT "FK_95e4409cfab042b067af3bebd57"`);
        await queryRunner.query(`DROP TABLE "produtos"."address"`);
    }

}

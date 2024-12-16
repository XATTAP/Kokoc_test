import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1734340523857 implements MigrationInterface {
  name = 'Auto1734340523857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Simple" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(6) DEFAULT now(), "deletedAt" TIMESTAMP(6), CONSTRAINT "PK_81acdada5e9f677ef1816516a42" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Simple"`);
  }
}

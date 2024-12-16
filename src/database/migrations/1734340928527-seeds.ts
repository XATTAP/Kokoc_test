import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class Migration1734340928527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let count = 0;
    for (let i = 0; i < Number(process.env.SEEDS_NUMBER) || 100; i++) {
      const title = faker.lorem.word();
      const createdAt = faker.date.past({ years: 2 });
      const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
      const deletedAt =
        faker.number.int({ min: 0, max: 100 }) < 15
          ? faker.date.between({ from: updatedAt, to: new Date() })
          : null;

      queryRunner.query(
        `INSERT INTO "Simple"("title", "createdAt", "updatedAt", "deletedAt") VALUES($1, $2, $3, $4)`,
        [title, createdAt, updatedAt, deletedAt],
      );
      count++;
    }
    console.log('COUNT: ', count);
  }

  public async down(): Promise<void> {}
}

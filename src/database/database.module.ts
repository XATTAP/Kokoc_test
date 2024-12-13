import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '#/src/database/database.providers';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders['development']],
  exports: [...databaseProviders['development']],
})
export class TypeOrmModule {}

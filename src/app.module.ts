import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '#/src/config/configuration';
import { TypeOrmModule } from '#/src/database/database.module';
import { SimpleModule } from '#/src/modules/simple/simple.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule,
    SimpleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

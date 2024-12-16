import { Module } from '@nestjs/common';
import { SimpleController } from '#/src/modules/simple/simple.controller';
import { SimpleService } from '#/src/modules/simple/simple.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simple } from '#/src/database/entities/simple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Simple])],
  controllers: [SimpleController],
  providers: [SimpleService],
})
export class SimpleModule {}

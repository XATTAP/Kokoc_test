import { Injectable } from '@nestjs/common';
import {
  CreateSimpleDto,
  UpdateSimpleDto,
} from '#/src/modules/simple/dtos/simple.dto';
import { Simple } from '#/src/database/entities/simple.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SimpleService {
  constructor(
    @InjectRepository(Simple)
    private readonly simpleRepository: Repository<Simple>,
  ) {}

  async list(): Promise<Simple[]> {
    const list = this.simpleRepository.createQueryBuilder().select().getMany();

    return list;
  }
  async getById(id: string): Promise<Simple> {
    const simple = this.simpleRepository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOneOrFail();
    return simple;
  }
  async create(body: CreateSimpleDto) {
    const result = await this.simpleRepository
      .createQueryBuilder()
      .insert()
      .into(Simple)
      .values(body)
      .execute();

    return result;
  }
  async update(id: string, body: UpdateSimpleDto) {
    const result = await this.simpleRepository
      .createQueryBuilder()
      .update(Simple)
      .set(body)
      .where('id = :id', { id })
      .execute();

    return result;
  }
  async delete(id: string) {
    const result = await this.simpleRepository
      .createQueryBuilder()
      .delete()
      .from(Simple)
      .where('id = :id', { id })
      .execute();

    return result;
  }
}

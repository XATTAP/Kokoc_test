import { Injectable, Search } from '@nestjs/common';
import {
  CreateSimpleDto,
  QueryListSimpleDto,
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

  async list(query: QueryListSimpleDto): Promise<Simple[]> {
    const { search, limit, page } = query;
    const queryBuilder = this.simpleRepository.createQueryBuilder().select();

    if (search) {
      queryBuilder.where('LOWER(title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const list = await queryBuilder.getMany();

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

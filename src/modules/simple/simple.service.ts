import { Injectable, NotFoundException } from '@nestjs/common';
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

  async list(query: QueryListSimpleDto) {
    const { search, limit, page } = query;
    const queryBuilder = this.simpleRepository.createQueryBuilder().select();

    if (search) {
      queryBuilder.where('LOWER("title") LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const result = await queryBuilder
      .addSelect(
        'EXTRACT(DAY FROM ("updatedAt" - "createdAt"))',
        'Simple_difference',
      )
      .getManyAndCount();

    return {
      ...(page !== undefined && limit !== undefined && { page, limit }),
      total: result[1],
      data: result[0],
    };
  }
  async getById(id: string) {
    const simple = await this.simpleRepository
      .createQueryBuilder()
      .select()
      .addSelect(
        'EXTRACT(DAY FROM ("updatedAt" - "createdAt"))',
        'Simple_difference',
      )
      .where('id = :id', { id })
      .getOne();

    if (!simple) {
      throw new NotFoundException(`Simple with id: ${id} not found`);
    }

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
    const simple = await this.getById(id);
    const result = await this.simpleRepository
      .createQueryBuilder()
      .update(Simple)
      .set(body)
      .where('id = :id', { id: simple.id })
      .execute();

    return result;
  }
  async delete(id: string) {
    const simple = await this.getById(id);
    const result = await this.simpleRepository
      .createQueryBuilder()
      .delete()
      .from(Simple)
      .where('id = :id', { id: simple.id })
      .execute();

    return result;
  }
}

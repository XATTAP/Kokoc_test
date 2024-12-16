import { SimpleService } from '#/src/modules/simple/simple.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateSimpleDto,
  UpdateSimpleDto,
} from '#/src/modules/simple/dtos/simple.dto';

@ApiTags('simples')
@Controller('simples')
export class SimpleController {
  constructor(private readonly simpleService: SimpleService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка сущностей' })
  findAll() {
    return this.simpleService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение сущности по ее id' })
  findById(@Param('id') id: string) {
    return this.simpleService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание сущности' })
  createUser(@Body() body: CreateSimpleDto) {
    return this.simpleService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление информации о сущности' })
  updateUser(@Body() body: UpdateSimpleDto, @Param('id') id: string) {
    return this.simpleService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление сущности' })
  deleteUser(@Param('id') id: string) {
    return this.simpleService.delete(id);
  }
}

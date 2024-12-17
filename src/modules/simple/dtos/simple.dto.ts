import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateSimpleDto {
  @ApiProperty({ description: 'Заголовок сущности', required: true })
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  title: string;
}

export class UpdateSimpleDto extends CreateSimpleDto {}

export class QueryListSimpleDto {
  @ApiProperty({
    description: 'Номер запрашиваемой страницы',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'Количество записей на странице',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'регистронезависимый поиск по вхождению',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}

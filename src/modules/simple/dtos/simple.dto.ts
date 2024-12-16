import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSimpleDto {
  @ApiProperty({ description: 'Заголовок сущности', required: true })
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  title: string;
}

export class UpdateSimpleDto extends CreateSimpleDto {}

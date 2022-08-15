import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    default: 'Diego',
    description: 'Nombre del cliente',
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: 'Salas',
    description: 'Apellido del cliente',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    default: 22,
    description: 'Edad del cliente',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    default: '2000-05-01T00:00:00.000Z',
    description: 'Nacimiento del cliente',
  })
  @IsDateString()
  birthday: Date;
}

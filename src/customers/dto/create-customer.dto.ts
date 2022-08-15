import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsDateString()
  birthday: Date;
}

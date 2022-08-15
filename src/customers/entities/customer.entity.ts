import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @ApiProperty({
    example: 'Diego',
    description: 'Nombre del cliente',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'Salas',
    description: 'Apellido del cliente',
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    example: 22,
    description: 'Edad del cliente',
  })
  @Prop()
  age: number;

  @ApiProperty({
    example: '2000-05-01T00:00:00.000Z',
    description: 'Nacimiento del cliente',
  })
  @Prop()
  birthday: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

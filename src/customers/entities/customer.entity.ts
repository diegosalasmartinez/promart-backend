import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop()
  birthday: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

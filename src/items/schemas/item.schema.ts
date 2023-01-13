import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  quantityUnits?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

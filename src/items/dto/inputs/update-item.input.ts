import { CreateItemInput } from './create-item.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}

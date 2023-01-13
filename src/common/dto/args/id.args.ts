import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class IdArgs {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

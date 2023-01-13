import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { IdArgs } from 'src/common/dto/args/id.args';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  async findOne(@Args() idArgs: IdArgs): Promise<Item> {
    return this.itemsService.findOne(idArgs.id);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  async removeItem(@Args() idArgs: IdArgs): Promise<Item> {
    return await this.itemsService.remove(idArgs.id);
  }
}

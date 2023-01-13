import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item, ItemDocument, ItemSchema } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = new this.itemModel(createItemInput);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    await this.findOne(id);
    return await this.itemModel.findByIdAndUpdate(id, updateItemInput, {
      new: true,
    });
  }

  async remove(id: string): Promise<Item> {
    await this.findOne(id);
    return await this.itemModel.findByIdAndDelete(id);
  }
}

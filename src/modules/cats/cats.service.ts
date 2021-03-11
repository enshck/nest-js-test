import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDocument, Cat } from '../../common/mongoSchemas/cat.schema';

import { ICatData } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(cat: ICatData): Promise<Cat> {
    const createdCat = new this.catModel(cat);
    return createdCat.save();
  }
  findAll(): ICatData[] {
    return [];
  }
  findCatByName(name: string): ICatData | null {
    return null;
  }
}

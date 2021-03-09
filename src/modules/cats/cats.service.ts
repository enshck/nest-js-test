import { Injectable } from '@nestjs/common';
import { ICatData } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: ICatData[] = [];

  create(cat: ICatData) {
    this.cats.push(cat);
  }
  findAll(): ICatData[] {
    return this.cats;
  }
  findCatByName(name: string): ICatData | null {
    return (
      this.cats.find((elem) =>
        elem.name.toLowerCase().includes(name.toLowerCase()),
      ) || null
    );
  }
}

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    return this.cats;
  }
  findCatByName(name: string): Cat | null {
    return (
      this.cats.find((elem) =>
        elem.name.toLowerCase().includes(name.toLowerCase()),
      ) || null
    );
  }
}

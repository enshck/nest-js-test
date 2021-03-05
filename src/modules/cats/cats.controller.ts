import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  UseFilters,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../../common/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  async getAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  createCat(@Body() data: Cat): string {
    this.catsService.create(data);
    return `${HttpStatus.CREATED}`;
  }

  @Get(':name')
  @UseFilters(HttpExceptionFilter)
  async getElementByName(@Param('name') name: string): Promise<Cat | string> {
    const findedElement = this.catsService.findCatByName(name);
    if (findedElement) {
      return findedElement;
    } else {
      throw new NotFoundException();
    }
  }
}

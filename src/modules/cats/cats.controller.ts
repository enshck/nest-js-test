import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  UseFilters,
  Param,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { JoiValidationPipe } from '../../common/joiValidationPipe';
import catSchema from '../../common/validationSchemas/cat.validation';

import { CreateCatDto, ICatData } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../../common/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<ICatData[]> {
    return this.catsService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(catSchema))
  createCat(@Body() data: CreateCatDto): string {
    this.catsService.create(data);
    return `${HttpStatus.CREATED}`;
  }

  @Get(':name')
  async getElementByName(
    @Param('name') name: string,
  ): Promise<ICatData | string> {
    const findedElement = this.catsService.findCatByName(name);
    if (findedElement) {
      return findedElement;
    } else {
      throw new NotFoundException();
    }
  }
}

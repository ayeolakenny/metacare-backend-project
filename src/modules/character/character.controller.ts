import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { GENDER } from './enum/gender.enum';
import { ORDER, SORT } from './enum/sort.enum';
import { Character, SingleCharacter } from './types/character.type';

@Controller('api/character')
@ApiTags('Character Management')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @ApiOkResponse({
    status: 200,
    description: 'List of all characters',
    type: Character,
    isArray: true,
  })
  @ApiQuery({
    name: 'sortby',
    description: 'sortBy e.g name, gender, height',
    required: false,
    type: String,
    enum: SORT,
  })
  @ApiQuery({
    name: 'dir',
    description: 'direction of the sort  asc or desc',
    required: false,
    type: String,
    enum: ORDER,
  })
  @ApiQuery({
    name: 'filter',
    description: 'filter by gender e.g male, female',
    required: false,
    type: String,
    enum: GENDER,
  })
  @Get()
  async findAll(
    @Query('sortby') sortby?: SORT,
    @Query('dir') dir?: ORDER,
    @Query('filter') filter?: GENDER,
  ) {
    return await this.characterService.findAll(sortby, dir, filter);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Find a character',
    type: SingleCharacter,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne({ id: +id });
  }
}

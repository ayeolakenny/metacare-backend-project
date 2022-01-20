import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './types/movie.type';

@Controller('api/movie')
@ApiTags('Movie Management')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOkResponse({
    status: 200,
    description: 'List of all movies',
    type: Movie,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Find a movie',
    type: Movie,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieService.findOne({ id: +id });
  }
}

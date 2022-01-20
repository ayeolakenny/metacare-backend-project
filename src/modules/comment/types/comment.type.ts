import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../../movie/types/movie.type';

export class Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  movie: Movie;

  @ApiProperty()
  createdAt: string;
}

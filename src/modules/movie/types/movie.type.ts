import { ApiProperty } from '@nestjs/swagger';

class MovieCount {
  @ApiProperty()
  comment: number;
}

export class Movie {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  opening_crawl: string;

  @ApiProperty()
  release_date: string;

  @ApiProperty()
  _count: MovieCount;
}

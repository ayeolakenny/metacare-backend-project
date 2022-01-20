import { ApiProperty } from '@nestjs/swagger';

class totalHeight {
  @ApiProperty()
  feet: number;

  @ApiProperty()
  inches: number;

  @ApiProperty()
  cm: number;
}

class metaData {
  @ApiProperty()
  totalCharacters: number;

  @ApiProperty()
  totalHeight: totalHeight;
}

export class Character {
  @ApiProperty()
  metaData: metaData;
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  height: string;
}

export class SingleCharacter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  height: string;
}

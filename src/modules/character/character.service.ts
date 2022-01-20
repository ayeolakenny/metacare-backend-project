import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateSortParameters } from 'src/helpers/generateSort';
import { PrismaService } from 'src/prisma.service';
import { GENDER } from './enum/gender.enum';
import { ORDER, SORT } from './enum/sort.enum';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}
  async findAll(sortby: SORT, dir: ORDER, filter: GENDER) {
    const sortOrder: {} | null = generateSortParameters(sortby, dir);

    const data = await this.prisma.character.findMany({
      where: {
        gender: {
          equals: filter,
        },
      },
      select: {
        id: true,
        name: true,
        gender: true,
        height: true,
      },
      orderBy: sortOrder,
    });

    let totalHeightCm: number = 0;
    const totalHeightFeet: number = 0;

    data.forEach((person) => {
      if (!isNaN(parseInt(person.height))) {
        totalHeightCm += parseInt(person.height);
      }
    });

    return {
      metaData: {
        totalCharacters: data.length,
        totalHeight: {
          feet: (totalHeightCm / 30.48).toFixed(2),
          inches: (totalHeightCm / 2.54).toFixed(2),
          cm: totalHeightCm.toFixed(2),
        },
      },
      characters: data,
    };
  }

  findOne(characterWhereUniqueInput: Prisma.CharacterWhereUniqueInput) {
    return this.prisma.character.findUnique({
      where: characterWhereUniqueInput,
      select: {
        id: true,
        name: true,
        gender: true,
        height: true,
      },
    });
  }
}

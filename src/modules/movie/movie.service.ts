import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.movie.findMany({
      include: {
        _count: {
          select: { comment: true },
        },
      },
      orderBy: {
        release_date: 'asc',
      },
    });
  }

  findOne(movieWhereUniqueInput: Prisma.MovieWhereUniqueInput) {
    return this.prisma.movie.findUnique({
      where: movieWhereUniqueInput,
      include: {
        _count: {
          select: { comment: true },
        },
      },
    });
  }
}

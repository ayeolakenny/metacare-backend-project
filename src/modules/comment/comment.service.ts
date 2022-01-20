import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MovieService } from '../movie/movie.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private movieService: MovieService,
  ) {}

  async create(input: CreateCommentDto) {
    if (input.comment.length > 500) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Comment must be less than 500 words',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const movie = await this.movieService.findOne({ id: input.movieId });
    if (!movie) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Movie does not exist',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.prisma.comment.create({
      data: input,
      select: {
        comment: true,
        id: true,
        movie: {
          include: {
            _count: {
              select: { comment: true },
            },
          },
        },
        createdAt: true,
        movieId: false,
      },
    });
  }

  findAll() {
    return this.prisma.comment.findMany({
      select: {
        id: true,
        comment: true,
        movie: {
          include: {
            _count: {
              select: { comment: true },
            },
          },
        },
        createdAt: true,
        movieId: false,
      },
    });
  }

  findOne(commentWhereUniqueInput: Prisma.CommentWhereUniqueInput) {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
      select: {
        id: true,
        comment: true,
        movie: {
          include: {
            _count: {
              select: { comment: true },
            },
          },
        },
        createdAt: true,
        movieId: false,
      },
    });
  }
}

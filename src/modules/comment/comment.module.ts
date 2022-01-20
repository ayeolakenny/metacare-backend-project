import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma.service';
import { MovieModule } from '../movie/movie.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
  imports: [MovieModule],
})
export class CommentModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './modules/character/character.module';
import { CommentModule } from './modules/comment/comment.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MovieModule, CommentModule, CharacterModule],
})
export class AppModule {}

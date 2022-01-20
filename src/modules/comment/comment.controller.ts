import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { Comment } from './types/comment.type';

@ApiTags('Comments Management')
@Controller('/api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Create comment',
    type: Comment,
  })
  @Post()
  create(@Body() input: CreateCommentDto) {
    return this.commentService.create(input);
  }

  @ApiOkResponse({
    status: 200,
    description: 'List of all comments',
    type: Comment,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Find a movie',
    type: Comment,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne({ id: +id });
  }
}

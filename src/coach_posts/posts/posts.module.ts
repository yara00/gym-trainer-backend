import { Module } from '@nestjs/common';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './service/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachPost } from '../../entity/coach-post.entity';
import { CoachPostMultimedia } from '../../entity/coach-post-multimedia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoachPost, CoachPostMultimedia])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

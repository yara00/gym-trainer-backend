import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { WorkoutCollectionService } from './workoutcollection.service';
import { WorkoutCollectionDto } from './dtos/workout_collection_dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { WorkoutCollection } from '../../entity/workout-collection.entity';
import { WorkoutCollectionUpdateDto } from './dtos/workout_collection_update_dto';
import { WorkoutSideUtils } from '../workoutSide.utils';
import { Coach } from '../../entity/coach.entity';

@Controller('workout-collection')
@UseGuards(JwtAuthGuard)
export class WorkoutCollectionController {
  constructor(
    private readonly workutCollectionService: WorkoutCollectionService,
  ) {}

  @Get('get-deault-collections-info')
  async test(): Promise<WorkoutCollection[]> {
    return this.workutCollectionService.getDeaultCollectionsInfo();
  }

  @Get('get-collection/:id')
  async getCollection(@Param('id') id: number): Promise<WorkoutCollection> {
    return this.workutCollectionService.getCollection(id);
  }

  @Post('create')
  async createWorkoutCollection(
    @Body() createWorkoutCollectionDto: WorkoutCollectionDto,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('createWorkoutCollection');
    console.log('createWorkoutCollectionDto', createWorkoutCollectionDto);
    console.log('user', getUser);

    const message = this.workutCollectionService.createWorkoutCollection(
      getUser,
      createWorkoutCollectionDto,
    );
    return message;
  }

  @Delete('delete/:id')
  async deleteWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('deleteWorkoutCollection');
    console.log('id', id);
    console.log('user', getUser);

    const message = this.workutCollectionService.deleteWorkoutCollection(
      getUser,
      id,
    );
    return message;
  }

  @Get('get-my-collections')
  async getMyCollections(
    @GetUser() user: User | Coach,
  ): Promise<WorkoutCollection[]> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('getMyCollections');
    console.log('user', getUser);

    return this.workutCollectionService.getMyCollections(getUser);
  }

  @Get('get-default-collections')
  async getDefaultCollections(): Promise<WorkoutCollection[]> {
    console.log('getDefaultCollections');

    return this.workutCollectionService.getDefaultCollections();
  }

  @Patch('update/:id')
  async updateWorkoutCollection(
    @Param('id') id: number,
    @Body() updateWorkoutCollectionDto: WorkoutCollectionUpdateDto,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('updateWorkoutCollection');
    console.log('id', id);
    console.log('updateWorkoutCollectionDto', updateWorkoutCollectionDto);
    console.log('user', getUser);

    const message = this.workutCollectionService.updateWorkoutCollection(
      getUser,
      id,
      updateWorkoutCollectionDto,
    );
    return message;
  }
}

import { Body, Controller, Delete, Param, Post, UseGuards, Get, Put } from '@nestjs/common';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { MealPlans } from '../../entity/meal_plans.entity';
import { User } from '../../entity/user.entity';
import { MealPlanDto } from './dtos/create-meal.dto';
import { MealPlanService } from './meal_plan.service';
import { Coach } from '../../entity/coach.entity';


@Controller('meal-plan')
@UseGuards(JwtAuthGuard)
export class MealPlanController {

  constructor(
    private readonly mealPlanService: MealPlanService
   
  ){}

  @Post('create')
  async createMealPlan(@Body() mealPlanDto:MealPlanDto, @GetUser() user: Coach|User):Promise<MealPlans> {
    if(user instanceof Coach){
      user= await user.user
    }
    return this.mealPlanService.createMealPlan(mealPlanDto, user);
  }

  @Delete('delete/:id')
  async deleteWorkoutPlan(@Param('id') id: number, @GetUser() user: User|Coach) {
    if(user instanceof Coach){
      user= await user.user
    }
    return this.mealPlanService.deleteMealPlan(id, user);
  }

  @Get('get-my-plans')
  async getMyPlans( @GetUser() user: User|Coach): Promise<MealPlans[]> {
    if(user instanceof Coach){
      user= await user.user
    }
    console.log('Get My Plans ');

    return this.mealPlanService.getMyPlans(user);
  }

  @Get('get-user-plans-by-coach/:id')
  getUserPlans(@Param('id') id: number,@GetUser() user: Coach): Promise<MealPlans[]> {
    return this.mealPlanService.getUserPlansByCoach(id,user);
  }

  @Put('update/:id')
  async updateMealPlan(
    @Param('id') id: number,
    @Body() MealPlanUpdateDto: MealPlanDto,
    @GetUser() user: User|Coach,
  ):Promise<MealPlans> {

    if(user instanceof Coach){
      user= await user.user
    }
    return this.mealPlanService.updateMealPlan(
      id,
      MealPlanUpdateDto,
      user,
    );
  }
  
  
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meals } from '../../entity/meals.entity';
import { User } from '../../entity/user.entity';
import { MealCategories } from '../../entity/meal_categories.entity';
import { Recipes } from '../../entity/recipes.entity';
import { MealRecipes } from '../../entity/meal_recipes.entity';
import { SavedMeals } from '../../entity/saved_meals.entity';
import { UserMealsHistory } from '../../entity/user_meals_history.entity';
import { UserPackageMealPlans } from '../../entity/user_package_meal_plans.entity';
import { UserSubscription } from '../../entity/user-subscription.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Meals,User,MealCategories,Recipes,MealRecipes,SavedMeals,UserMealsHistory,UserPackageMealPlans,UserSubscription])],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule { }
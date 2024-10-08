import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import typeorm from './config/typeorm';
import { ImageService } from './utils/image/image.service';
import { WorkoutController } from './workout_side/workout/workout.controller';
import { ExerciseModule } from './workout_side/exercise/exercise.module';
import { ExerciseService } from './workout_side/exercise/exercise.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PopulationModule } from './population/population.module';
import { ExerciseController } from './workout_side/exercise/exercise.controller';
import { WorkoutModule } from './workout_side/workout/workout.module';
import { WorkoutService } from './workout_side/workout/workout.service';
import { WorkoutHistoryModule } from './workout_side/history/workoutHistory.module';
import { WorkoutHistoryController } from './workout_side/history/workoutHistory.controller';
import { WorkoutHistoryService } from './workout_side/history/workoutHistory.service';
import { SaveModule } from './workout_side/save/save.module';
import { SaveController } from './workout_side/save/save.controller';
import { SaveService } from './workout_side/save/save.service';
import { WorkoutCollectionModule } from './workout_side/workout_collection/workoutcollection.module';
import { WorkoutCollectionController } from './workout_side/workout_collection/workoutcollection.controller';
import { WorkoutCollectionService } from './workout_side/workout_collection/workoutcollection.service';
import { WorkoutPlanModule } from './workout_side/workout_plan/workoutplan.module';
import { WorkoutPlanController } from './workout_side/workout_plan/workoutplan.controller';
import { WorkoutPlanService } from './workout_side/workout_plan/workoutplan.service';
import { WorkoutPlanPackegeModule } from './workout_side/workout-package/workoutpackage.module';
import { WorkoutPlanPackageController } from './workout_side/workout-package/workoutpackage.controller';
import { WorkoutPlanPackageService } from './workout_side/workout-package/workoutpackage.service';
import { ExerciseFilterModule } from './workout_side/exercise/filter/filter.module';
import { ExerciseFilterController } from './workout_side/exercise/filter/filter.controller';
// import { Exercise } from './entity/exercise.entity';
import { ExerciseFilterService } from './workout_side/exercise/filter/filter.service';
import { PackagesModule } from './packages/packages.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { CoachesModule } from './users/coaches/coaches.module';
import { IngredientModule } from './nutrition_side/ingredient/ingredient.module';
import { RecipeModule } from './nutrition_side/recipe/recipe.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoachSocialMediaModule } from './coach_social_media/coach_social_media.module';
// import { IngredientService } from './nutrition_side/ingredient/ingredient.service';
// import { IngredientController } from './nutrition_side/ingredient/ingredient.controller';
import { StatisticModule } from './statistic/statistic.module';
import { SubscriptionsReviewsModule } from './subscriptions_reviews/subscriptions_reviews.module';
import { CoachCertificatesModule } from './coach_certificates/coach_certificates.module';
import { MealModule } from './nutrition_side/meal/meal.module';
import { CoachPostsModule } from './coach_posts/coach_posts.module';
import { CryptoModule } from './crypto/crypto.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseService } from './firebase/firebase.service';
import { MealPlanModule } from './nutrition_side/meal_plan/meal_plan.module';
import { MealPlanPackageModule } from './nutrition_side/meal-plan-package/mealplanpackage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    EventEmitterModule.forRoot(),
    CloudinaryModule,
    ExerciseModule,
    AuthModule,
    UsersModule,
    CoachesModule,
    PopulationModule,
    WorkoutModule,
    WorkoutHistoryModule,
    SaveModule,
    WorkoutCollectionModule,
    WorkoutPlanModule,
    WorkoutPlanPackegeModule,
    ExerciseFilterModule,
    PackagesModule,
    UserSubscriptionsModule,
    IngredientModule,
    RecipeModule,
    NotificationsModule,
    CoachSocialMediaModule,
    RecipeModule,
    StatisticModule,
    SubscriptionsReviewsModule,
    RecipeModule,
    CoachCertificatesModule,
    MealModule,
    CoachPostsModule,
    MealPlanModule,
    MealPlanPackageModule,
    CryptoModule,
    ChatModule,
  ],
  controllers: [
    AppController,
    WorkoutController,
    // IngredientController,
    ExerciseController,
    WorkoutController,
    WorkoutHistoryController,
    SaveController,
    WorkoutCollectionController,
    WorkoutPlanController,
    WorkoutPlanPackageController,
    ExerciseFilterController,
  ],
  providers: [
    AppService,
    ImageService,
    ExerciseService,
    WorkoutService,
    WorkoutHistoryService,
    SaveService,
    WorkoutCollectionService,
    WorkoutPlanService,
    WorkoutPlanPackageService,
    ExerciseFilterService,
    FirebaseService,
  ],
})
export class AppModule {}

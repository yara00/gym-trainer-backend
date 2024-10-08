import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DurationUnitEnum } from '../packages/duration-unit.enum';
import { Coach } from './coach.entity';
//import { PackageDiscount } from './package-discount.entity';
import { UserSubscription } from './user-subscription.entity';
import { UserPackageMealPlans } from './user_package_meal_plans.entity';
import { UserPackageWorkoutPlan } from './user-package-workoutPlan.entity';

@Entity('coach_packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.packages, { eager: true })
  @JoinColumn({ name: 'coachId' })
  coach: Coach;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  duration: number;

  @Column({
    type: 'enum',
    enum: DurationUnitEnum,
    default: DurationUnitEnum.MONTH,
  })
  durationUnit: DurationUnitEnum;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: false })
  hasNutrition: boolean;
  /*
  @OneToMany(
    () => PackageDiscount,
    (package_discount) => package_discount.package,
    { cascade: true },
  )
  discounts: PackageDiscount[];
  */
  @OneToMany(() => UserSubscription, (subscription) => subscription.package)
  subscriptions: UserSubscription[];

  @OneToMany(
    () => UserPackageMealPlans,
    (userPackageWorkoutPlan) => userPackageWorkoutPlan.package,
  )
  userPackageMealPlans: UserPackageMealPlans[];

  @OneToMany(
    () => UserPackageWorkoutPlan,
    (userPackageWorkoutPlan) => userPackageWorkoutPlan.package,
  )
  userPackageWorkoutPlans: UserPackageWorkoutPlan[];

  async getSubscriptionsCount(): Promise<number> {
    const subscriptions = await this.subscriptions;

    return subscriptions.length;
  }
}

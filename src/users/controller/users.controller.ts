import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UsersService } from '../service/users.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { CoachSummaryDto } from '../coaches/dtos/coach-summary.dto';
import { User } from '../../entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('my_coaches')
  getMyCoaches(@GetUser() user: User): Promise<CoachSummaryDto[]> {
    return this.usersService.getMyCoaches(user.id);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from '../schemas/user.schema';
import { AchievementSchema } from '../schemas/achievement.schema';
import { RankSchema } from '../schemas/rank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Achievement', schema: AchievementSchema },
      { name: 'Rank', schema: RankSchema }
      ])
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactionService } from './faction.service';
import { FactionSchema } from '../schemas/faction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Faction', schema: FactionSchema }])
  ],
  providers: [FactionService],
  exports: [FactionService],
})
export class FactionModule {}

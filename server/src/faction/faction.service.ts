import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Faction } from '../interfaces/faction.interface';
import {User} from '../interfaces/user.interface';
import {CreateFactionDto} from '../dto/create-faction.dto';

@Injectable()
export class FactionService {
    constructor(@InjectModel('Faction') private readonly factionModel: Model<Faction>) { }

    async getFactions(): Promise<Faction[]> {
        const factions = await this.factionModel.find().exec();
        return factions;
    }

}

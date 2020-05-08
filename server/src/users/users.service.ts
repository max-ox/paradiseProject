import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';

// export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findOne(email: string): Promise<User | undefined> {

        const user = await this.userModel
            .findOne({email})
            .exec();
        return user;
    }
}

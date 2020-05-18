import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        console.log('createUserDto', createUserDto);
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email });
    }

    async findByID(id: string): Promise<User | undefined> {
        console.log('findByID id', id)
        return await this.userModel.findById({ _id: id });
    }
}

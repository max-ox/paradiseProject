import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        console.log('create start')
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save()
        //     .then( (user, err) => {
        //     if(err) {
        //         return err
        //     }
        //    console.log('err', err);
        //    console.log('user', user);
        //    return user;
        // });

    }

    async findOne(email: string): Promise<User | undefined> {

        const user = await this.userModel
            .findOne({email})
            .exec();
        return user;
    }
}

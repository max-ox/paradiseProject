import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User|any> {
        const isNicknameExist = await this.userModel.find({nickname : createUserDto.nickname}, (err, docs) => {
            if (!docs.length){
                return false;
            }else{
                return true;
            }
        })
        const isEmailExist = await this.userModel.find({email: createUserDto.email}, (err, docs) => {
            if (!docs.length){
                return false;
            }else{
                return true;
            }
        });
        if(!isNicknameExist.length && !isEmailExist.length) {
            const createdUser = new this.userModel(createUserDto);
            return createdUser.save();
        } else {
            throw new Error(`User with this ${isNicknameExist.length ? 'Nickname,' : ''} ${isEmailExist.length ? 'email' : ''} is already exist`)
        }
    }

    async findOrCreate(profile): Promise<User | undefined> {
        return await this.userModel.findOrCreate({ vkId: profile.id }, function (err, user) {
            // if(err) {
            //
            // } else {
            //
            // }
            return user;
                // return (err, user);
            });
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email });
    }

    async findByID(id: string): Promise<User | undefined> {
        const createdUser = await this.userModel.findOne({ _id: id })
          .populate('achievements').populate('faction').populate('rank');
        return createdUser;
    }
}

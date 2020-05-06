import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreatePostDTO } from '../dto/create-post.dto';
import { RegisterDTO } from '../dto/register.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async addUser(registerDTO: RegisterDTO): Promise<User> {
        const newUser = await this.userModel(registerDTO);
        return newUser.save();
    }

}
